"use client";
import QRCode from "react-qr-code";

export default function DynamicQRCode({ value, size, className }: { value: string, size?: number, className?: string }) {
    return <QRCode value={value} size={size} className={className} />;
}
