import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import validateMongoDbID from "../utils/validateMongoDBId.js";
import generateRefreshToken from "../config/refreshToken.js";
import generateToken from "../config/jwtToken.js";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import MongoURL from "../models/url.model.js";

// Create A New User in the MONGODB database
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  try {
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      // User already exists
      return res.status(400).json({ error: "User Already Exists" });
    }

    // If user not found, create a new user
    const newUser = await User.create(req.body);
    return res.status(201).json({
      newUser,
      message: "New User Created Successfully",
    });
  } catch (error) {
    console.error("Error in createUser:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// const createUser = asyncHandler(async (req, res) => {
//   const email = req.body.email;
//   const { firstName, lastName } = req.body; // Extract firstName and lastName from request body

//   try {
//     const findUser = await User.findOne({ email: email });

//     if (findUser) {
//       // User already exists
//       return res.status(400).json({ error: "User Already Exists" });
//     }

//     // Create initials from firstName and lastName
//     const initials = `${firstName.charAt(0)}${lastName.charAt(
//       lastName.length - 1
//     )}`.toUpperCase();

//     // Add initials to user data
//     const newUser = await User.create({ ...req.body, initials });

//     return res.status(201).json({
//       newUser,
//       message: "New User Created Successfully",
//     });
//   } catch (error) {
//     console.error("Error in createUser:", error.message);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  // check if user exists or not
  const findUser = await User.findOne({ email });

  // if user found and password is also matched
  if (findUser && (await findUser.isPasswordMatched(password))) {
    // res.json(findUser);
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      { refreshToken: refreshToken },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credential");
  }
});

// Get ALL the Users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json({ getUsers, message: "All Users Fetched" });
  } catch (error) {
    console.log("Error in getAllUsers Controller");
    throw new Error(error);
  }
});

// Update User's Name, Email, Mobile Number
const updateUser = asyncHandler(async (req, res) => {
  // console.log(req.user);
  //   const { _id } = req.params;
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const updateuser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json({ updateuser, message: "User Updated Successfully !!!" });
  } catch (error) {
    console.log("Error in updateUser");
    throw new Error(error);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error(" No Refresh token present in db or not matched");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });

  res.json(user);
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.json(204, { message: "User Logged Out Successfully" }); // forbidden
});

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure `req.user.id` exists
    console.log(userId)

    // If userId doesn't exist, return a bad request error
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    // Optional: Delete any related data (e.g., URLs associated with the user)
    const deleteUrls = await MongoURL.deleteOne({ userId });

    // Now delete the user from the database
    const user = await User.findByIdAndDelete(userId);

    if (user) {
      // Optionally log out the user and clear their session data if necessary
      res.status(200).json({ message: "User and related data deleted successfully" });
    } else {
      res.status(400).json({ error: "Failed to delete user, user not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  logout,
  deleteUser,
  handleRefreshToken,
};
