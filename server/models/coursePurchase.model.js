import mongoose from "mongoose";
const coursePurchaseScheme = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CoursePurchase = mongoose.model(
  "CoursePurchase",
  coursePurchaseScheme
);
