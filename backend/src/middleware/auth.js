import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (!"authorization" in req.headers) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.decoded = decoded;
      next();
    } catch (e) {
      console.error(e.message);
      return res.status(401).json({ status: "error", msg: "unauthorised" });
    }
  } else {
    console.error("missing token");
    return res.status(403).json({ status: "error", msg: "missing token" });
  }
};
