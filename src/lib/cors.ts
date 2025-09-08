import Cors from "cors";
import initMiddleware from "./init-middleware";

// CORS options
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    origin: "*",
  })
);

export default cors;
