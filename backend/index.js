import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/utils/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { app, server } from "./src/utils/socket.js";

const PORT = process.env.PORT || 5000

dotenv.config();
//connect to database
connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true}));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get('/',(req,res)=>{
  res.send('<h1>Hello Dammu Chat App</h1>')
})

  server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    
  });


export default server;
