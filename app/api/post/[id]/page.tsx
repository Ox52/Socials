// app/post/[id]/page.tsx
import dbConnect from "@/lib/db";
import Post, { IPost } from "@/models/Post";
import User from "@/models/User";
import { PostCard } from "@/components/post-card";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

// Set dynamic to auto for non-authenticated pages
export const dynamic = "auto";

// Type for the populated post
type PopulatedPost = Omit<IPost, "userId"> & {
  userId: { email: string };
};

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // 1. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await dbConnect();

  // 2. Fetch the single post and populate user info
  const post = (await Post.findById(id)
    .populate({ path: "userId", model: User, select: "email" })
    .lean()
    .exec()) as PopulatedPost | null;

  if (!post) {
    notFound();
  }

  // 3. Map to PostCard format
  const displayPost = {
    _id: post._id.toString(),
    caption: post.caption,
    imageUrl: post.imageUrl,
    likes: post.likes,
    userEmail: post.userId.email,
    createdAt: post.createdAt.toISOString(),
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight mb-6 hidden sm:block">
        Post Detail
      </h1>
      <PostCard post={displayPost} />
    </div>
  );
}
