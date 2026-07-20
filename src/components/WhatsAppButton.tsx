"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "923309879158";
const DEFAULT_MESSAGE =
  "Hi! I have a question about Bereket Foods products. Can you help me?";

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-8 z-[90] flex flex-col items-end gap-3 mb-20 sm:mb-0">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="relative bg-white shadow-xl rounded-2xl p-4 max-w-[220px] border border-[#e8e3d5]">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1a2e1c]">Support Team</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                <p className="text-[10px] text-[#6b7c6b]">Online Now</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#3a3a2e] leading-relaxed">
            Have questions? Chat with us on WhatsApp for instant help!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center bg-[#25D366] text-white text-xs font-semibold py-2 px-4 rounded-full hover:bg-[#128C7E] transition-colors"
          >
            Start Chat
          </a>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center relative"
        aria-label="WhatsApp Support"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="w-6 h-6 relative z-10" />
      </button>
    </div>
  );
}
