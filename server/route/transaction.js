import expres from 'express';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controller/transaction.controller.js';

const router = expres.Router();

// google login

router.get('/google-login', (req, res) => {
  res.send('Google login route');
});


// transaction routes for CRUD operations
router.route('/transactions').get(getTransactions).post(createTransaction);
router.route('/transactions/:id').put(updateTransaction).delete(deleteTransaction);

export default router