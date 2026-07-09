"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface ServiceOption {
  value: string;
  label: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "Pruebas de Polígrafo", label: "Pruebas de Polígrafo" },
  { value: "Vetting (Verificación de Antecedentes)", label: "Vetting (Verificación de Antecedentes)" },
  { value: "Estudio de Confiabilidad 360°", label: "Estudio de Confiabilidad 360°" },
  { value: "Visitas Domiciliarias", label: "Visitas Domiciliarias" },
  { value: "Pruebas Toxicológicas", label: "Pruebas Toxicológicas" },
  { value: "Evaluaciones Psicométricas", label: "Evaluaciones Psicométricas" },
  { value: "Prueba de Honestidad, Ética y Valores", label: "Prueba de Honestidad, Ética y Valores" },
  { value: "Curso Básico en Poligrafía 400 H", label: "Curso Básico en Poligrafía 400 H" },
  { value: "Cursos Avanzados de Poligrafía", label: "Cursos Avanzados de Poligrafía" },
  { value: "Formaciones Complementarias", label: "Formaciones Complementarias" },
];

interface ServiceSelectProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  className?: string;
}

export default function ServiceSelect({
  value,
  onChange,
  disabled = false,
  error = false,
  placeholder = "Selecciona un servicio",
  className = "",
}: ServiceSelectProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = SERVICE_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showDropdown) return;

    window.dispatchEvent(new CustomEvent("lenis-stop"));

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
        return;
      }
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", "Home", "End"].includes(e.code)) {
        if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
          return;
        }
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeyScroll, { passive: false });

    return () => {
      window.dispatchEvent(new CustomEvent("lenis-start"));
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [showDropdown]);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setShowDropdown(!showDropdown)}
        className={`px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium flex items-center justify-between text-left cursor-pointer ${
          error ? "ring-2 ring-red-200 focus:ring-red-400" : "focus:ring-[#700FA3]/20"
        } ${showDropdown ? "ring-2 ring-[#700FA3]/20 bg-white shadow-md" : ""}`}
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        <span className={selectedOption ? "text-neutral-800 font-medium" : "text-neutral-400 font-medium"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ml-2 ${showDropdown ? "rotate-180 text-[#700FA3]" : ""}`} />
      </button>

      {showDropdown && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neutral-200 rounded-lg shadow-2xl z-[100] flex flex-col py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <style dangerouslySetInnerHTML={{__html: `
            .service-select-scroll {
              scrollbar-width: thin !important;
              scrollbar-color: #700FA3 #f3f4f6 !important;
            }
            .service-select-scroll::-webkit-scrollbar {
              width: 5px;
            }
            .service-select-scroll::-webkit-scrollbar-track {
              background: #f3f4f6;
            }
            .service-select-scroll::-webkit-scrollbar-thumb {
              background: #700FA3;
              border-radius: 4px;
            }
          `}} />
          <div className="max-h-60 overflow-y-auto service-select-scroll" data-lenis-prevent="true">
            {SERVICE_OPTIONS.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setShowDropdown(false);
                  }}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#700FA3]/10 text-[#700FA3] font-semibold"
                      : "text-neutral-700 hover:bg-[#700FA3]/10 hover:text-[#700FA3]"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#700FA3] shrink-0 ml-2" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
