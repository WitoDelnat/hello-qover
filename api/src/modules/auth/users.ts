import { Schema, model } from "mongoose";
import { createSalt, createHash } from "./utils";

interface User {
  username: string;
  password: string;
  salt: string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: String,
  salt: String,
});

export const User = model("User", userSchema);

export async function addFirstUser(): Promise<void> {
  const existingUser = await User.findOne({ username: "Qover" });
  if (existingUser) {
    return;
  }

  const salt = createSalt();
  const hash = createHash("Ninja", salt);
  const user = new User({
    username: "Qover",
    password: hash,
    salt,
  });
  await user.save();
}
