import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  locationName: { type: String, required: true },
  locationImage: { type: String, required: true },
  //   hotels: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
});

export default mongoose.model("Location", LocationSchema);
