const mongoose = require("mongoose");

const ClinicSchema = new mongoose.Schema(
  {
    address: { type: String },
    coordinates: { lon: { type: Number }, lat: { type: Number } },
    distance: { type: Number },
  },
  { collection: "clinics" }
);

const Clinic = mongoose.model("Clinic", ClinicSchema);

module.exports = Clinic;
