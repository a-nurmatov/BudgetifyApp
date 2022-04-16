import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { model, Schema } = mongoose;

const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Link to user required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  uniqueness: {
    type: String,
    unique: true,
    required: [true, "Uniqueness is required"],
  },
});

categorySchema.plugin(uniqueValidator, {
  message: "{PATH} already in use.",
});

export default model("Category", categorySchema);
