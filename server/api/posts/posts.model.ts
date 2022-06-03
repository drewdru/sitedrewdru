import mongoose from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
// import mongooseUniqueValidator from "mongoose-unique-validator";

interface IPost extends mongoose.Document {
  title: string;
  text: string;
  description?: string;
  preview?: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    preview: {
      type: String,
      required: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    // validateModifiedOnly: true,
  } // as any
);

PostSchema.plugin(mongoosePagination);
// PostSchema.plugin(mongooseUniqueValidator);
// TODO: FIX VALIDATOR

export default mongoose.model<IPost, Pagination<IPost>>(
  "post",
  PostSchema,
  "posts"
);
