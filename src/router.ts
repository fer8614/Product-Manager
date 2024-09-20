import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();


//Routing
router.get('/', getProducts); 
router.get('/:id',
    param('id').isInt().withMessage('Id must be an integer'), 
    handleInputErrors,
    getProductById
); 

router.post( '/', 
    // Validations
    param('id')
        .isInt().withMessage('Id must be an integer'), 
    body('name')
        .notEmpty().withMessage('Product name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .withMessage('Price is required')
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
        .withMessage('Price is required')
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