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
} from "@/lib/cms";
import { revalidatePath } from "next/cache";

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
    const body = await request.json();
    let { type, action, data, id } = body;

    // Normalize plural types from frontend to singular forms
    if (type === "services") type = "service";
    if (type === "courses") type = "course";
    if (type === "blogs") type = "blog";
    if (type === "podcasts") type = "podcast";

    if (!type || !action) {
      return NextResponse.json({ error: "Missing type or action" }, { status: 400 });
    }

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
