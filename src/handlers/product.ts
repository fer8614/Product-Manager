import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";

export const createProduct = async ( req: Request, res: Response ) => {
    // Validations
    await check('name')
        .notEmpty().withMessage('Product name is required')
        .run(req); 
    await check('price')
        .isNumeric().withMessage('Price must be a number')
        .withMessage('Price is required')
        .custom( value => value > 0 ).withMessage('Price must be greater than 0')
        .run(req);
    // await check('availability').not().isEmpty().withMessage('Availability is required').run(req);
    // const errors = validationResult(req);
    // if( !errors.isEmpty() ){
    //     return res.status(400).json({ errors: errors.array() });
    // }

    let errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.create( req.body );
    res.json({ data: product });
}