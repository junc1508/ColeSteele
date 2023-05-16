const mongoose = require("mongoose");
const Product = require("./product");
const { Schema } = mongoose;
const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name!"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
//set up query middleware
// farmSchema.pre("findOneAndDelete", async function (data) {
//   console.log("Pre middleware");
//   console.log(data);
// });
farmSchema.post("findOneAndDelete", async function (farm) {
  if (farm.products.length) {
    const res = await Product.deleteMany({ _id: { $in: farm.products } });
    console.log(res);
  }
});

const Farm = new mongoose.model("Farm", farmSchema);
module.exports = Farm;
