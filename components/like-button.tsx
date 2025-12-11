
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";



interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  const [currentLikes, setCurrentLikes] = useState(initialLikes);

  const handleLikeClick = () => {
    setIsLiked((prev) => {
      if (prev) {
      
        setCurrentLikes(currentLikes - 1);
      } else {
        
        setCurrentLikes(currentLikes + 1);
      }
      return !prev;
    });

  
  };

  const heartClass = isLiked
    ? "text-red-500 fill-red-500/80"
    : "text-gray-500 fill-gray-500/0 group-hover:fill-red-500/80";

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="group h-8 w-8"
        onClick={handleLikeClick}
        aria-label={`Like post ${postId}`}
      >
        <Heart className={`h-5 w-5 transition-colors ${heartClass}`} />
      </Button>
      <span className="text-sm font-medium text-gray-600">
        {currentLikes.toLocaleString()}
      </span>
    </div>
  );
}
