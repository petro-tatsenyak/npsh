import express from 'express';
import deliveryController from '../delivery/delivery.controller';

const router = express.Router();

router.get('/warehouses', deliveryController.getNovaPoshtaWarehouses);

router.get('/cities', deliveryController.getNovaPoshtaCities);

router.get('/streets', deliveryController.getNovaPoshtaStreets);

router.get('/price', deliveryController.getNovaPoshtaPrices);

export default router;
