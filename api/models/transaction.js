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
      required: [true, "Type is required"],
    },
    title: {
      type: String,
      required: [true, "Name required"],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    payee: {
      type: String,
      required: [true, "Payee is required"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Transaction", transactionSchema);
