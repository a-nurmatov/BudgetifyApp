import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { model, Schema } = mongoose;

// TODO currency should be reference to currency model/schema

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Link to user required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [128, "Maximum number of characters 128"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    amount: {
      type: Number,
      min: 1,
      required: [true, "Amount is required"],
    },
    currency: {
      type: String,
      uppercase: true,
      required: [true, "Currency is required"],
    },
    description: {
      type: String,
      maxlength: [256, "Maximum number of characters 256"],
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.plugin(uniqueValidator, {
  message: "{PATH} already in use.",
});

export default model("Account", accountSchema);
