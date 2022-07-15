const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    postcode: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    children: [
      {
        name: { type: String, required: true, unique: true },
        isMale: { type: Boolean, required: true },
        DOB: { type: Date, required: true },
        logs: [
          {
            date: { type: Date, required: true, default: Date.now() },
            height: { type: Number, required: true },
            weight: { type: Number, required: true },
            headCirc: { type: Number, required: true },
          },
        ],
        appointments: [
          {
            date: { type: Date, required: true },
            location: { type: String },
            doctorName: { type: String },
            futureAppt: { type: Boolean },
            reason: { type: String },
          },
        ],
      },
    ],
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
