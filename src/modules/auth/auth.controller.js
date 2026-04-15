import { registerUser, loginUser } from "./auth.service.js";
import { ApiResponse } from "../../common/utils/api-response.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    ApiResponse(res, 201, "User registered successfully", user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    ApiResponse(res, 200, "Login successful", data);
  } catch (err) {
    next(err);
  }
};