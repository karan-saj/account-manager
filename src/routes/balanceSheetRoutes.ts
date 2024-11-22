import { Router } from 'express';
import { BalanceSheetController } from '../controllers/balanceSheetController';

const balanceSheetRoutes = Router();
const balanceSheetController = new BalanceSheetController();

// get balance sheet report 
balanceSheetRoutes.get('/reports', balanceSheetController.getBalanceSheetReport);

export default balanceSheetRoutes;
