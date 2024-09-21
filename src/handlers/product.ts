import { Request, Response } from "express";
import Product from "../models/Product.model";
import { error } from "console";

export const getProducts = async ( req : Request, res : Response ) => {
    try {
        const products = await Product.findAll( {
            order: [
                ['price', 'DESC']
            ]
        });
        res.json({ data: products });
    } catch (error) {
        console.log( error );
    }
}

export const getProductById = async ( req : Request, res : Response ) => {
    try {
       const { id } = req.params;
       const product = await Product.findByPk( id );

       if( !product ) {
           return res.status(404).json({ 
                error: 'Product not found' 
            });
       }

       res.json({ data: product });
    } catch (error) {
        console.log( error );
    }
}

export const createProduct = async ( req: Request, res: Response ) => {
   try {
       const product = await Product.create( req.body );
       res.status(201).json({ data: product });
   } catch ( error ) {
       console.log( error );
   }
}

export const updateProduct = async ( req: Request, res: Response ) => {
    
    const { id } = req.params;
    const product = await Product.findByPk( id );
 
    if( !product ) {
        return res.status(404).json({ 
            error: 'Product not found' 
        });
    }

    // Update product
    await product.update( req.body );
    // Get updated product
    product.save();
    
    res.json({ data: product });
}

export const updateAvailability = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const product = await Product.findByPk( id );
 
    if( !product ) {
        return res.status(404).json({ 
            message: 'Product not found' 
        });
    }

    // Update product
    product.availability = !product.dataValues.availability;
    // Get updated product
    await product.save();
    res.json({ data: product });
}

export const deleteProduct = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const product = await Product.findByPk( id );
 
    if( !product ) {
        return res.status(404).json({ 
            message: 'Product not found' 
        });
    }

    // Delete product
    await product.destroy();
    res.json({ data: 'Product deleted' });
}