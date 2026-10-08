"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "../siteData";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-black/20 hover:scale-110 active:scale-95 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
    </motion.a>
  );
}
