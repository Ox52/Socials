import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";


export async function POST(req: Request) {
  
  const GUEST_USER_ID = "60c84f9382f6e100155b5d12";

  try {
    await dbConnect();
    const { caption, imageUrl } = await req.json();

    if (!imageUrl && caption.trim() === "") {
      return NextResponse.json(
        { message: "Post must have a caption or an image." },
        { status: 400 }
      );
    }

    // Create the post using the GUEST_USER_ID
    const newPost = await Post.create({
      userId: GUEST_USER_ID,
      caption: caption.trim(),
      imageUrl: imageUrl,
      likes: 0,
    });

    return NextResponse.json(
      { message: "Post created successfully.", postId: newPost._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
