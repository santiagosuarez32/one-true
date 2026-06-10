import { NextResponse } from "next/server";
import {
  getDb,
  saveService,
  deleteService,
  saveCourse,
  deleteCourse,
  saveBlog,
  deleteBlog,
  savePodcast,
  deletePodcast,
  saveCalendarIntake,
  deleteCalendarIntake,
  saveSetting,
  createBackup,
  listBackups,
  deleteBackupFile,
  restoreBackup,
  restoreBackupFromFile,
} from "@/lib/cms";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Can be ignored if middleware is refreshing sessions
          }
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
}

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 1. Verify authenticated admin session in server
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "No autorizado. Por favor inicie sesión." }, { status: 401 });
    }

    const body = await request.json();
    let { type, action, data, id } = body;

    // Normalize plural types from frontend to singular forms
    if (type === "services") type = "service";
    if (type === "courses") type = "course";
    if (type === "blogs") type = "blog";
    if (type === "podcasts") type = "podcast";
    if (type === "calendar_intakes") type = "calendar_intake";

    if (!type || !action) {
      return NextResponse.json({ error: "Missing type or action" }, { status: 400 });
    }

    // 2. Trigger automatic backup prior to write/modify/delete operations
    const isWriteAction = action === "save" || action === "delete";
    if (isWriteAction && type !== "backup") {
      try {
        await createBackup(true); // isAuto = true
        console.log("Automatic backup generated successfully before database modification.");
      } catch (backupErr) {
        console.error("Warning: Automatic backup failed to write:", backupErr);
      }
    }

    // 3. Process actions
    if (type === "service") {
      if (action === "save") {
        await saveService(data);
      } else if (action === "delete") {
        await deleteService(id);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else if (type === "course") {
      if (action === "save") {
        await saveCourse(data);
      } else if (action === "delete") {
        await deleteCourse(id);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else if (type === "blog") {
      if (action === "save") {
        await saveBlog(data);
      } else if (action === "delete") {
        await deleteBlog(id);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else if (type === "podcast") {
      if (action === "save") {
        await savePodcast(data);
      } else if (action === "delete") {
        await deletePodcast(id);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else if (type === "calendar_intake") {
      if (action === "save") {
        await saveCalendarIntake(data);
      } else if (action === "delete") {
        await deleteCalendarIntake(id);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else if (type === "settings") {
      if (action === "save") {
        await saveSetting(data.key, data.value);
      } else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else if (type === "backup") {
      if (action === "list") {
        const backups = await listBackups();
        return NextResponse.json({ success: true, data: backups });
      } else if (action === "create") {
        const filename = await createBackup(false);
        return NextResponse.json({ success: true, filename });
      } else if (action === "delete") {
        if (!id) {
          return NextResponse.json({ error: "Missing backup ID/filename" }, { status: 400 });
        }
        await deleteBackupFile(id);
        return NextResponse.json({ success: true });
      } else if (action === "restore") {
        if (data && data.backupData) {
          await restoreBackup(data.backupData);
        } else if (id) {
          await restoreBackupFromFile(id);
        } else {
          return NextResponse.json({ error: "Missing restore parameters" }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: "Invalid backup action" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // Force revalidation of all pages to reflect changes
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: error.message || "Failed to modify database" }, { status: 500 });
  }
}
