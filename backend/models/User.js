// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the structure of a user
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // Unique username
    email: { type: String, required: true, unique: true },    // Unique email
    password: { type: String, required: true },               // Hashed password
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Before saving the user, hash the password
userSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create model from schema
const User = mongoose.model("User", userSchema);

export default User;
