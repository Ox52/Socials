
import mongoose, { Document, Model, Types } from "mongoose";


export interface IPost extends Document {
  userId: Types.ObjectId;
  caption: string;
  imageUrl: string;
  likes: number;
  createdAt: Date;
  
  user: {
    email: string;
  };
}


const PostSchema = new mongoose.Schema<IPost>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  caption: {
    type: String,
    trim: true,
    default: "",
  },
  imageUrl: {
    type: String, 
    required: [true, "An image is required."],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Post = (mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema)) as Model<IPost>;

export default Post;
