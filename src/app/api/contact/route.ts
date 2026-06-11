import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { form_name, nombre, apellido, email, telefono, ciudad, mensaje, empresa, servicio } = await request.json();

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId.startsWith("your_") || templateId.startsWith("your_") || publicKey.startsWith("your_")) {
      console.warn("EmailJS credentials are not configured or are using placeholders in environment variables.");
      return NextResponse.json(
        { error: "Error de configuración: Faltan las variables de entorno reales de EmailJS en el servidor." },
        { status: 500 }
      );
    }

    const payload: Record<string, any> = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        form_name: form_name || "Formulario de Contacto",
        nombre: nombre || "",
        apellido: apellido || "",
        email: email || "",
        telefono: telefono || "",
        ciudad: ciudad || "",
        mensaje: mensaje || "",
        empresa: empresa || "No aplica/No provisto",
        servicio: servicio || "No aplica/No provisto",
      },
    };

    // Include private key as accessToken if configured and not placeholder
    if (privateKey && !privateKey.startsWith("your_")) {
      payload.accessToken = privateKey;
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS sending error response:", errorText);
      return NextResponse.json(
        { error: `Error de EmailJS al enviar el correo: ${errorText || "Respuesta fallida del servidor."}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API contact route error:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor al procesar el contacto." },
      { status: 500 }
    );
  }
}
