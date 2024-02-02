// bed.js (model file)
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const bedSchema = new Schema(
  {
    first_name: [String],
    id: [String],
    age: [Number],
    bed_number: [Number],
    bht_number: [String],
    crp: [Number],
    date_of_fever: [Number],
    date_of_leak_over: [String],
    dexamethasone: [String],
    hb: [Number],
    inr: [Number],
    ns1_status: [String],
    pcv: [Number],
    plt: [Number],
    scr: [Number],
    sgot: [Number],
    sgpt: [Number],
    vots: [Number],
    wbc: [Number],
    ultrasound_findings: [String],
  },
  {
    timestamps: true,
  }
);

const Bed = mongoose.models.Bed || mongoose.model("Bed", bedSchema);

export default mongoose.models.Bed || mongoose.model("Bed", bedSchema);
