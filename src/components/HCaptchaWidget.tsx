"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export interface HCaptchaRef {
  reset: () => void;
}

interface HCaptchaWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (err: string) => void;
  className?: string;
}

export const HCaptchaWidget = forwardRef<HCaptchaRef, HCaptchaWidgetProps>(
  ({ onVerify, onExpire, onError, className = "" }, ref) => {
    const captchaRef = useRef<HCaptcha | null>(null);

    const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "598c6040-dade-4c60-a34a-e4b4ac563cf0";

    useImperativeHandle(ref, () => ({
      reset: () => {
        captchaRef.current?.resetCaptcha();
      },
    }));

    return (
      <div className={`flex flex-col items-center justify-center my-2 ${className}`}>
        <HCaptcha
          ref={captchaRef}
          sitekey={sitekey}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
          languageOverride="es"
        />
      </div>
    );
  }
);

HCaptchaWidget.displayName = "HCaptchaWidget";
