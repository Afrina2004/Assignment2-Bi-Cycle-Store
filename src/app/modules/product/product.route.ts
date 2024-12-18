import express from 'express';
import { ProductControllers } from './product.controller';
 
const router = express.Router();

router.post('/', ProductControllers.createABicycle);

router.get('/', ProductControllers. getAllBicycles);

router.get('/:id', ProductControllers.getASpecificBicycle);

router.put('/:id', ProductControllers.updateABicycle);

router.delete('/:id', ProductControllers. deleteABicycle);



export const ProductRoutes = router;
