import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { model, Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
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
});

categorySchema.plugin(uniqueValidator, {
  message: "{PATH} already in use.",
});

export default model("Category", categorySchema);
