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
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [128, "Maximum number of characters 128"],
      trim: true,
    },
    balance: {
      type: Number,
      default: 0,
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
    uniqueness: {
      type: String,
      required: [true, "Uniqueness is required"],
      unique: true,
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
