import { Router } from 'express';

const router = Router();


//Routing
router.get('/', (req, res) => {
    res.json('From GET');
})

router.post('/', (req, res) => {
    res.json('From POST');
})

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