

import dbConnect from "@/lib/db";
import Post, { IPost } from "@/models/Post";
import User from "@/models/User";
import { PostCard } from "@/components/post-card";


export const dynamic = "force-dynamic";

export default async function HomePage() {
  await dbConnect();

 
  const posts: IPost[] = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({ path: "userId", model: User, select: "email" })
    .lean()
    .exec();

  
  const displayPosts = posts.map((post) => {
    const populatedUser = post.userId as unknown as {
      email?: string;
      _id?: string;
    } | null;

   
    const userEmail = populatedUser
      ? populatedUser.email || "Anonymous"
      : "Anonymous User"; // 

    return {
      ...post,
      _id: post._id.toString(),
      userEmail: userEmail,
      createdAt: post.createdAt.toISOString(),
    };
  });

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-3xl font-bold tracking-tight sr-only">Home Feed</h1>
      {displayPosts.length > 0 ? (
        displayPosts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <div className="text-center py-10 bg-white border rounded-lg shadow-sm">
          <p className="text-gray-500">
            No posts yet! Be the first to{" "}
            <a href="/post/new" className="text-blue-500 underline">
              create one
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
