// load the models
const Product = require("../models/product");

// CRUD functions
// get all products
const getProducts = async (name, price, category) => {
  // create a container for filter
  let filter = {};
  // if name exists, pass it to the filter container
  if (name) {
    filter.name = name;
  }
  // if price exist, pass it into the filter container
  if (price) {
    filter.price = { $gt: price };
  }
  // if category exist, pass into the filter container
  if (category) {
    filter.category = category;
  }

  // apply filter in .find()
  const products = await Product.find(filter);
  return products;
};

// get one product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// add new product
const addNewProduct = async (name, description, price, category) => {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // save the new product into mongodb
  await newProduct.save();
  return newProduct;
};

// update product
const updateProduct = async (id, name, description, price, category) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true, // return back the updated data
    }
  );
  return updatedProduct;
};

// delete product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

// export all the functions
module.exports = {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
