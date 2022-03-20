import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import uniqueValidator from "mongoose-unique-validator";
import { genSalt, hash } from "bcrypt";

const { model, Schema } = mongoose;

//TODO countries should be ref to country model/schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 128,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 128,
    },
    email: {
      type: String,
      required: [true, "Email address required"],
      unique: [true, "Email already in use"],
      lowercase: true,
      trim: true,
      maxlength: 128,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    birthDate: {
      type: Date,
      required: [true, "Birth date required"],
    },
    country: {
      type: String,
      required: [true, "Country required"],
      maxlength: 128,
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not valid",
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: "{PATH} already in use.",
});

userSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

export default model("User", userSchema);
