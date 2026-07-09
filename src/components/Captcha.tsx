"use client";

import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { RotateCw, ShieldCheck } from "lucide-react";

export interface CaptchaRef {
  validate: () => boolean;
  getHoneypotValue: () => string;
  reset: () => void;
}

interface CaptchaProps {
  onValidityChange?: (isValid: boolean) => void;
  className?: string;
}

export const Captcha = forwardRef<CaptchaRef, CaptchaProps>(({ onValidityChange, className = "" }, ref) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState(false);

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer("");
    setError(false);
    if (onValidityChange) onValidityChange(false);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const expectedAnswer = num1 + num2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    const numVal = parseInt(val, 10);
    const isValid = !isNaN(numVal) && numVal === expectedAnswer;
    setError(!isValid && val.length > 0);
    if (onValidityChange) {
      onValidityChange(isValid);
    }
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (honeypot.trim() !== "") return false;
      const numVal = parseInt(userAnswer, 10);
      const isValid = !isNaN(numVal) && numVal === expectedAnswer;
      setError(!isValid);
      return isValid;
    },
    getHoneypotValue: () => honeypot,
    reset: () => {
      generateChallenge();
    },
  }));

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {/* Honeypot field hidden from real humans */}
      <div style={{ display: "none", position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="website_url_hp">Leave this field empty</label>
        <input
          type="text"
          id="website_url_hp"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <label className="text-xs font-semibold text-neutral-600 flex items-center gap-1.5" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        <ShieldCheck className="w-4 h-4 text-[#700FA3]" />
        Verificación de Seguridad (Anti-Spam) *
      </label>

      <div className="flex items-center gap-2">
        <div className="bg-neutral-100 border border-neutral-200 px-3.5 py-2 rounded text-sm font-bold text-neutral-700 select-none tracking-wider whitespace-nowrap shadow-inner" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          {num1} + {num2} = ?
        </div>

        <input
          type="number"
          placeholder="Resultado"
          value={userAnswer}
          onChange={handleChange}
          className={`px-3.5 py-2 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all text-sm font-medium w-full ${
            error ? "focus:ring-red-400 ring-2 ring-red-200 text-red-600" : "focus:ring-[#700FA3]/20"
          }`}
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          required
        />

        <button
          type="button"
          onClick={generateChallenge}
          title="Generar nuevo código"
          className="p-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-[#700FA3] transition-colors flex-shrink-0"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <span className="text-xs text-red-500 font-medium">
          Respuesta incorrecta. Por favor calcula {num1} + {num2}.
        </span>
      )}
    </div>
  );
});

Captcha.displayName = "Captcha";
