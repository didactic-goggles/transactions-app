import { Router } from 'express';

import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactions';

const router = Router();

router.post('/', createTransaction);

router.get('/', getTransactions);

router.patch('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

export default router;
