const mongoose = require("mongoose");

const offersSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  requirements: {
    type: Array,
    require: true,
  },
});
const Offers = mongoose.model("Offers", offersSchema);
module.exports = Offers;
