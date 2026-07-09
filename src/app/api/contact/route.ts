import { NextResponse } from "next/server";
import { validateHumanName } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const { form_name, nombre, apellido, email, telefono, ciudad, mensaje, empresa, servicio, website_url_hp, hcaptcha_token } = await request.json();

    // Anti-spam Honeypot check: reject if bot filled hidden field
    if (website_url_hp && typeof website_url_hp === "string" && website_url_hp.trim() !== "") {
      return NextResponse.json({ error: "Spam detectado." }, { status: 400 });
    }

    // Validate Nombre & Apellido against keyboard mashing / gibberish
    if (nombre && typeof nombre === "string") {
      const nameCheck = validateHumanName(nombre);
      if (!nameCheck.isValid) {
        return NextResponse.json({ error: `Nombre inválido: ${nameCheck.error}` }, { status: 400 });
      }
    }

    if (apellido && typeof apellido === "string") {
      const surnameCheck = validateHumanName(apellido);
      if (!surnameCheck.isValid) {
        return NextResponse.json({ error: `Apellido inválido: ${surnameCheck.error}` }, { status: 400 });
      }
    }

    // Verify hCaptcha Token
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;
    const hcaptchaSitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

    if (!hcaptcha_token) {
      return NextResponse.json(
        { error: "Por favor completa la verificación de seguridad hCaptcha." },
        { status: 400 }
      );
    }

    const verifyParams = new URLSearchParams();
    verifyParams.append("secret", hcaptchaSecret || "");
    verifyParams.append("response", hcaptcha_token);
    verifyParams.append("sitekey", hcaptchaSitekey || "");

    const hcaptchaRes = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: verifyParams.toString(),
    });

    const hcaptchaData = await hcaptchaRes.json();

    if (!hcaptchaData.success) {
      console.error("hCaptcha verification failed:", hcaptchaData);
      return NextResponse.json(
        { error: "La verificación de hCaptcha falló o expiró. Por favor inténtalo de nuevo." },
        { status: 400 }
      );
    }

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
