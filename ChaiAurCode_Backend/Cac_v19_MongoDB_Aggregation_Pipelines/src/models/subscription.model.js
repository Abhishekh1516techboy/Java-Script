import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // one who is
      ref: "User",
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId, // one to who 'subscriber' is subscribing
      ref: "User",
      required: true,
    },
  },
  { timeseries: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
