
"use client";

import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Use this for protected data fetching in a Server Component
import { protectRoute } from "@/lib/auth";


export default function CreatePostPage() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isPostButtonDisabled = useMemo(() => {
    return isLoading || (!file && caption.trim() === "");
  }, [isLoading, file, caption]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      setFile(droppedFile);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isPostButtonDisabled) return;

    setIsLoading(true);
    setError(null);

    let imageUrl = "";
   
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageUrl = reader.result as string;
        await postData(imageUrl);
      };
      reader.onerror = () => {
        setError("Error reading file.");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      // Post without an image if only caption is present (optional)
      await postData(imageUrl);
    }
  };

  const postData = async (base64Image: string) => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption, imageUrl: base64Image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post.");
      }

      // Success: Redirect to home
      router.push("/");
      router.refresh(); // Refresh the home feed to show the new post
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred during post creation."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors relative"
            onClick={() => document.getElementById("file-upload")?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              placeholder="enter ya"
            />
            {previewUrl ? (
              <div className="relative h-64 w-full mx-auto">
                <Image
                  src={previewUrl}
                  alt="Image Preview"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-600">
                  Click to upload an image or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  (Image is highly recommended)
                </p>
              </div>
            )}
          </div>

          {/* Caption Textarea */}
          <Textarea
            placeholder="Write a caption…"
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={isPostButtonDisabled}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
