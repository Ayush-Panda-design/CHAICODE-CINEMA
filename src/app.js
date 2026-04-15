import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";
import seatRoutes from "./modules/seat/seat.routes.js";

const app = express();


app.use(cors());
app.use(express.json());



app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);
app.use("/seats", seatRoutes);

export default app;