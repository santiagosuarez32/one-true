"use client";

import React, { useState, useEffect, useRef } from "react";
import { COUNTRIES } from "@/lib/countries";

interface PhoneCountrySelectProps {
  country: string;
  setCountry: (val: string) => void;
  loading: boolean;
  hasIcon?: boolean;
  phoneValue?: string;
  onPhoneChange?: (val: string) => void;
  phoneError?: boolean;
}

export default function PhoneCountrySelect({ country, setCountry, loading, hasIcon, phoneValue, onPhoneChange, phoneError }: PhoneCountrySelectProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.prefix.includes(searchTerm)
  );

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

    if (showDropdown) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });
    }
    
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [showDropdown]);

  return (
    <div className={`relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all ${showDropdown ? 'ring-2 ring-[#700FA3]/20 bg-white shadow-md' : ''}`}>
      <div className="flex items-center gap-2 pl-3 border-r border-neutral-200/60 bg-transparent shrink-0 relative" ref={dropdownRef}>
        <div 
          className="flex items-center gap-1.5 cursor-pointer py-2.5 pl-1 pr-2 hover:bg-neutral-100 rounded transition-colors"
          onClick={() => !loading && setShowDropdown(!showDropdown)}
        >
          <img src={`https://flagcdn.com/w40/${country}.png`} alt={country} className="w-5 h-3.5 object-cover rounded-[2px] shrink-0 border border-neutral-200/50 shadow-2xs select-none" />
          <span className="text-sm font-medium text-neutral-700 select-none min-w-[36px] text-center" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            {COUNTRIES.find(c => c.code === country)?.prefix}
          </span>
          <svg className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${showDropdown ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {showDropdown && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-[260px] bg-white border border-neutral-200 rounded shadow-xl z-[100] flex flex-col">
            <div className="p-2 border-b border-neutral-100">
              <input
                type="text"
                placeholder="Buscar país o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-[#700FA3] focus:ring-1 focus:ring-[#700FA3] transition-all font-medium"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              />
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              .custom-white-scroll {
                scrollbar-width: thin !important;
                scrollbar-color: #d1d5db #f3f4f6 !important;
              }
              .custom-white-scroll::-webkit-scrollbar {
                width: 8px !important;
              }
              .custom-white-scroll::-webkit-scrollbar-track {
                background: #f3f4f6 !important;
                border-radius: 4px !important;
              }
              .custom-white-scroll::-webkit-scrollbar-thumb {
                background: #d1d5db !important;
                border-radius: 4px !important;
              }
              .custom-white-scroll::-webkit-scrollbar-thumb:hover {
                background: #9ca3af !important;
              }
            `}} />
            <div className="max-h-[220px] overflow-y-auto custom-white-scroll" data-lenis-prevent="true">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <div
                    key={c.code}
                    className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-neutral-50 transition-colors ${country === c.code ? 'bg-[#700FA3]/5' : ''}`}
                    onClick={() => {
                      setCountry(c.code);
                      setShowDropdown(false);
                      setSearchTerm("");
                    }}
                  >
                    <img src={`https://flagcdn.com/w40/${c.code}.png`} alt={c.name} className="w-5 h-3.5 object-cover rounded-[2px] shrink-0 border border-neutral-200/50 shadow-2xs" />
                    <span className="text-sm font-medium text-neutral-700 flex-1 truncate" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{c.name}</span>
                    <span className="text-xs font-medium text-neutral-400" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{c.prefix}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-sm text-center text-neutral-500" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  No se encontraron países
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <input 
        name="telefono" 
        type="tel" 
        placeholder="+593 099 371 2790" 
        className={`flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0 text-sm font-medium ${phoneError ? 'outline-red-500 outline-1' : ''}`} 
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }} 
        required 
        disabled={loading} 
        value={phoneValue} 
        onChange={onPhoneChange ? (e) => onPhoneChange(e.target.value) : undefined} 
      />
      {hasIcon && (
        <div className="pr-3 text-[#700FA3] pointer-events-none">
          <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>
      )}
    </div>
  );
}
