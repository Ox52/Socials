
"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast"; 

interface ShareButtonProps {
  postUrl: string;
}

export function ShareButton({ postUrl }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);

     
      console.log(`Link copied: ${postUrl}`);
      ;

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      title={copied ? "Copied!" : "Share/Copy Link"}
      onClick={handleShareClick}
      className="relative"
    >
      <Upload className="h-5 w-5 text-gray-500 hover:text-gray-900 transition-colors" />

      
      {copied && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-green-500 rounded-lg whitespace-nowrap">
          Copied!
        </span>
      )}
    </Button>
  );
}
