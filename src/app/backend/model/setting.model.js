import { Schema, mongoose } from "mongoose";

const SettingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    setting: {},
  },
  {
    timestamps: true,
  }
);
const Setting =
  mongoose.models.Setting || mongoose.model("Setting", SettingSchema);

export default Setting;
