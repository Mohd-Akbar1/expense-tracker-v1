import expres from 'express';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,filterTransactions,downloadTransactions
} from '../controller/transaction.controller.js';
import { protect } from '../middleware/AuthMiddleware.js';

const router = expres.Router();

// google login

router.get('/google-login', (req, res) => {
  res.send('Google login route');
});

// CRUD routes for transactions with protection middleware
router
  .route('/transactions')
  .get(protect, getTransactions)
  .post(protect, createTransaction);

router
  .route('/transactions/:id')
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

router.route('/transactions/download').get(protect, downloadTransactions);



 //filter transactions
router.route('/transactions/filter').get(protect,filterTransactions);

export default router;