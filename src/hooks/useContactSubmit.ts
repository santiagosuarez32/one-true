import { useState } from "react";

export function useContactSubmit(formName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (data: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_name: formName,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ocurrió un error al enviar el formulario.");
      }

      setSuccess(true);
      return true;
    } catch (err: any) {
      console.error("Hook contact submission error:", err);
      setError(err.message || "Error de red al conectar con el servidor.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, submitForm, setSuccess };
}
