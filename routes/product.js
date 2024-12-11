const express = require("express");
//create a router for products
const router = express.Router();

// import functions from controller
const {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/product");

/* 
  create the routes (CRUD)
 1. Add a new product: `POST /products`

 2. List all products: `GET /products`

 3. Get specific product details by its ID: `GET /products/:id`

 4. Update a product by its ID: `PUT /products/:id`

 5. Delete a product by its ID: `DELETE /products/:id`
*/

router.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// get all the products. Pointing to /products
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const price = req.query.price;
    const category = req.query.category;
    // use the getProducts from the controller to laod the products data
    const products = await getProducts(name, price, category);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// get one product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add product
// POST http://localhost:5555/products
router.post("/", async (req, res) => {
  try {
    // retrieve the data from req.body
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check for error
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        error: "Product not found",
      });
    }

    // pass in all the data to addNewProduct function
    const newProduct = await addNewProduct(
      name,
      description,
      price,
      category
    );
    res.status(200).send(newProduct);
  } catch (error) {
    // if there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// update product
// PUT http://localhost:5555/products/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    // pass in the data into the updateProduct function
    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete product
// DELETE http://localhost:5555/products/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // trigger the deleteProduct function
    await deleteProduct(id);
    res.status(200).send({
      message: `Product with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
