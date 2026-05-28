import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // 👈 Mongoose import kiya
import dotenv from "dotenv";     // 👈 Dotenv import kiya
import authRoutes from "./routes/authRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs";
import { createRequire } from "module";
import swaggerUi from "swagger-ui-express";

// dotenv ko sabse upar config karna zaroori hai
dotenv.config(); 

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = express();
app.use(cors());
app.use(express.json());

// 🔽 MongoDB Atlas Connection Code
const mongoURI = process.env.MONGO_URI || "mongodb+srv://gauravsingh070371_db_user:hH1ce0e6GUrsUI4o@cluster0.d6d6l3g.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("🔥 DB CONNECTED SUCCESSFULLY TO MONGO ONDEMAND!"))
  .catch((err) => console.error("❌ MONGO CONNECTION ERROR:", err));
// 🔼 MongoDB Code Ends

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});