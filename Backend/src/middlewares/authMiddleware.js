// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";

// const authMiddleware = asyncHandler(async (req, res, next) => {
//   let token;
//   if (req?.headers?.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//     try {
//       if (token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log(decoded);
//         const user = await User.findById(decoded?.id);
//         req.user = user;
//         next();
//       }
//     } catch (error) {
//       throw new Error("Not Authorized Token expired Please Login again");
//     }
//   } else {
//     throw new Error("There is no token attached to header");
//   }
// });

// export { authMiddleware };



import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Auth Middleware to check for valid JWT and attach user to request
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Authorization header is present with Bearer token
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token from header
    try {
      if (token) {
        // Verify the JWT token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the token
        const user = await User.findById(decoded.id);
        
        // If user is not found in database, throw error
        if (!user) {
          throw new Error("User not found, please login again");
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware/controller
      } else {
        throw new Error("Token missing, please provide a token");
      }
    } catch (error) {
      // Handle JWT errors (expired, invalid, etc.)
      throw new Error(
        error.message || "Not authorized. Token may have expired or is invalid"
      );
    }
  } else {
    throw new Error("Authorization header missing, please provide a token");
  }
});

export { authMiddleware };
