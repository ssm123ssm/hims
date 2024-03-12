// bed.js (model file)
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const bedSchema = new Schema(
  {
    first_name: [{ value: String, timestamp: Date }],
    id: [String],
    age: [{ value: Number, timestamp: Date }],
    bed_number: [{ value: Number, timestamp: Date }],
    bht_number: [{ value: String, timestamp: Date }],
    crp: [{ value: Number, timestamp: Date }],
    date_of_fever: [{ value: Number, timestamp: Date }],
    date_of_leak_over: [{ value: String, timestamp: Date }],
    dexamethasone: [{ value: String, timestamp: Date }],
    hb: [{ value: Number, timestamp: Date }],
    inr: [{ value: Number, timestamp: Date }],
    ns1_status: [{ value: String, timestamp: Date }],
    pcv: [{ value: Number, timestamp: Date }],
    plt: [{ value: Number, timestamp: Date }],
    scr: [{ value: Number, timestamp: Date }],
    sgot: [{ value: Number, timestamp: Date }],
    sgpt: [{ value: Number, timestamp: Date }],
    vots: [{ value: Number, timestamp: Date }],
    wbc: [{ value: Number, timestamp: Date }],
    ultrasound_findings: [{ value: String, timestamp: Date }],
    status: [String],
    hx: [
      {
        value: String,
        timestamp: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Bed = mongoose.models.Bed || mongoose.model("Bed", bedSchema);

export default mongoose.models.Bed || mongoose.model("Bed", bedSchema);
