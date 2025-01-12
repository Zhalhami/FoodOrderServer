import mongoose from "mongoose";

const specialOffersSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  pricebefore: { type: Number, required: true },
});

const SpecialOffers = mongoose.model("SpecialOffers", specialOffersSchema);

export default SpecialOffers;
