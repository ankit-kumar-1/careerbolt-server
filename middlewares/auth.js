
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the 'Bearer <token>' format

  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    throw new Error("Invalid/Expired Token, please login again");
  } else {
    // Save the user into req obj
    req.user = decoded?.id;
    next();
  }
});
