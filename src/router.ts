import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: Keyboard
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 51
 *         availability:
 *           type: boolean
 *           description: The availability of the product
 *           example: true
 *       required:
 *         - name
 *         - price
 *         - availability
 *       example:
 *         id: 1
 *         name: Keyboard
 *         price: 101
 *         availability: true
 *   responses:
 *     InvalidInput:
 *       description: Invalid input
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Get a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 */
//Routing
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on unique ID
 *     parameters:
 *     - in : path
 *       name: id
 *       description: The ID if the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *
 *       400:
 *         description: Bad Request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("Id must be an integer"),
  handleInputErrors,
  getProductById,
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Keyboard"
 *               price:
 *                 type: number
 *                 example: 101
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *       400:
 *         description: Bad Request - Invalid input
 *
 *
 */
router.post(
  "/",
  // Validations
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),

  handleInputErrors,
  createProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product with user input
 *     tags:
 *       - Products
 *     description: Update a product with user input
 *     parameters:
 *     - in : path
 *       name: id
 *       description: The ID if the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Keyboard"
 *               price:
 *                 type: number
 *                 example: 101
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or invalid input data
 *       404:
 *         description: Product not found
 */
router.put(
  "/:id",
  // Validations
  param("id").isInt().withMessage("Id must be an integer"),
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  body("availability")
    .isBoolean()
    .withMessage("Availability must be a boolean"),
  handleInputErrors,
  updateProduct,
);
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update availability of a product
 *     tags:
 *       - Products
 *     description: Return the updated availability
 *     parameters:
 *     - in : path
 *       name: id
 *       description: The ID if the product to retrieve
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product not found
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("Id must be an integer"),
  handleInputErrors,
  updateAvailability,
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     description: Return a confirmation message
 *     parameters:
 *     - in : path
 *       name: id
 *       description: The ID if the product to delete
 *       required: true
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: "Product deleted successfully"
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product not found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id must be an integer"),
  handleInputErrors,
  deleteProduct,
);

export default router;
