import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"], // More informative error message
      trim: true, // Remove leading/trailing whitespace
      minlength: [3, "Name must be at least 3 characters"], // Basic validation
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Please enter your mobile number"],
      unique: true,
      trim: true,
      match: [
        /^[0-9]{10}$/, // Basic 10-digit mobile number validation (adjust as needed)
        "Please enter a valid 10-digit mobile number",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // If our password is not modified than don't update it and simple go next()
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// login functionality for compairing the passwords
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a reset Token for updated Password
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 60 * 1000; // 10 minutes
  return resetToken;
};

export default mongoose.model("User", userSchema);
