import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

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
router.get('/', getProducts); 
router.get('/:id',
    param('id').isInt().withMessage('Id must be an integer'), 
    handleInputErrors,
    getProductById
); 

router.post( '/', 
    // Validations
    body('name')
        .notEmpty().withMessage('Product name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .notEmpty().withMessage('Price is required')
        .custom( value => value > 0 ).withMessage('Price must be greater than 0'),
    
    handleInputErrors,
    createProduct 
);

router.put('/:id', 
    // Validations
    param('id')
        .isInt().withMessage('Id must be an integer'), 
    body('name')
        .notEmpty().withMessage('Product name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .notEmpty().withMessage('Price is required')
        .custom( value => value > 0 ).withMessage('Price must be greater than 0'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean'),
    handleInputErrors,
    updateProduct 
);

router.patch('/:id', 
    param('id')
        .isInt().withMessage('Id must be an integer'), 
    handleInputErrors,
    updateAvailability 
);

router.delete('/:id',
    param('id')
        .isInt().withMessage('Id must be an integer'), 
    handleInputErrors,
    deleteProduct
);

export default router;