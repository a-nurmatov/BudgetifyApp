import mongoose from "mongoose";

const { model, Schema } = mongoose;

const transactionSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Link to account required"],
    },
    type: {
      type: String,
      default: "income",
      required: [true, "Type is required"],
      enum: {
        values: ["income", "expense"],
        message: "{VALUE} is not valid",
      },
    },
    title: {
      type: String,
      required: [true, "Name required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Link to category required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    fileId: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Transaction", transactionSchema);
