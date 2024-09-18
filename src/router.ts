import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();


//Routing
router.get('/', (req, res) => {
    res.json('From GET');
})

router.post( '/', 
    // Validations
    body('name')
        .notEmpty().withMessage('Product name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .withMessage('Price is required')
        .custom( value => value > 0 ).withMessage('Price must be greater than 0'),
    
    handleInputErrors,
    createProduct 
);

router.put('/', (req, res) => {
    res.json('From PUT');
})

router.patch('/', (req, res) => {
    res.json('From PATCH');
})

router.delete('/', (req, res) => {
    res.json('From DELETE');
})

export default router;