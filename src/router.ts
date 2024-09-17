import { Router } from 'express';
import { createProduct } from './handlers/product';

const router = Router();


//Routing
router.get('/', (req, res) => {
    res.json('From GET');
})

router.post( '/', createProduct );

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