import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email, whatsapp, puesto, rubro, cantPersonas } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "El correo electrónico es obligatorio" }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (!apiKey || !listId) {
      console.warn("Mailchimp credentials are not configured in environment variables.");
      return NextResponse.json(
        { error: "Error de configuración: Faltan las variables de entorno de Mailchimp en el servidor." },
        { status: 500 }
      );
    }

    // Server prefix is the datacenter at the end of the API key, e.g. "us21" from "xxx-us21"
    const serverPrefix = apiKey.split("-")[1];
    if (!serverPrefix) {
      return NextResponse.json({ error: "Formato de MAILCHIMP_API_KEY inválido" }, { status: 500 });
    }

    // MD5 of lowercase email for Mailchimp member identifier
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");

    // 1. PUT member (Upsert) to avoid errors if member already exists
    const memberUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}?skip_merge_validation=true`;
    
    const memberPayload = {
      email_address: email.trim(),
      status_if_new: "subscribed",
      status: "subscribed" // Force status to subscribed
    };

    const memberRes = await fetch(memberUrl, {
      method: "PUT",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberPayload),
    });

    if (!memberRes.ok) {
      const errorData = await memberRes.json();
      console.error("Mailchimp member upsert error:", errorData);
      return NextResponse.json(
        { error: errorData.detail || "Error al registrar suscriptor en Mailchimp" },
        { status: memberRes.status }
      );
    }

    // 2. Add Tags to the subscriber (POST /3.0/lists/{list_id}/members/{subscriber_hash}/tags)
    const tagsUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}/tags`;
    const tagsPayload = {
      tags: [
        { name: "Ebook Lead", status: "active" },
        { name: `Puesto: ${puesto || "No especificado"}`, status: "active" },
        { name: `Rubro: ${rubro || "No especificado"}`, status: "active" },
        { name: `Empleados: ${cantPersonas || "No especificado"}`, status: "active" }
      ]
    };

    const tagsRes = await fetch(tagsUrl, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagsPayload),
    });

    if (!tagsRes.ok) {
      const tagsError = await tagsRes.json();
      console.warn("Mailchimp tags error:", tagsError);
    }

    // 3. Add a detailed Note to the subscriber (POST /3.0/lists/{list_id}/members/{subscriber_hash}/notes)
    const notesUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}/notes`;
    const noteText = `Descarga de Ebook.\nWhatsApp: ${whatsapp || "No provisto"}\nPuesto: ${puesto || "No especificado"}\nRubro de Empresa: ${rubro || "No especificado"}\nNúmero de Empleados: ${cantPersonas || "No especificado"}`;
    
    const notesPayload = {
      note: noteText
    };

    const notesRes = await fetch(notesUrl, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notesPayload),
    });

    if (!notesRes.ok) {
      const notesError = await notesRes.json();
      console.warn("Mailchimp notes error:", notesError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API subscribe route error:", error);
    return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
  }
}
