const mongoose = require("mongoose");

const offersSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
});

const Offers = mongoose.model("Offers", offersSchema);
module.exports = Offers;
