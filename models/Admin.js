import mongoose from "mongoose";

const AdminShema = new mongoose.Schema(
  {
    username: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },

  { timestamps: true }
);
export default mongoose.model("Admin", AdminShema);
