import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies.token);
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};