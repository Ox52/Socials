
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import { LikeButton } from "./like-button"; 
import { ShareButton } from "./share-button";


interface DisplayPost {
  _id: string;
  userEmail: string;
  caption: string;
  imageUrl: string;
  likes: number;
  createdAt: string;
}

export function PostCard({ post }: { post: DisplayPost }) {
  const { _id, userEmail, caption, imageUrl, likes, createdAt } = post;
  const relativeTime = formatRelativeTime(createdAt);
  const displayName = userEmail.split("@")[0];
  const postUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/post/${_id}`; 

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
      
      <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-2">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gray-200">
            <span className="text-gray-500">👤</span>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-800">
            {displayName}
          </span>
          <span className="text-xs text-gray-500">{relativeTime}</span>
        </div>
      </CardHeader>

      
      {caption && (
        <CardContent className="px-4 py-2 text-sm text-gray-700">
          <p>{caption}</p>
        </CardContent>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt="Uploaded Post Image"
            fill
            className="object-cover"
          />
        </div>
      )}

      
      <CardFooter className="flex flex-col p-4 pt-2">
        <div className="flex w-full items-center justify-between">
     
          <LikeButton postId={_id} initialLikes={likes} />

          <ShareButton postUrl={postUrl} />
        </div>
      </CardFooter>
    </Card>
  );
}
