import { Transaction } from "../database/transactions.schema.js";
import { Parser } from "json2csv"; 
export const getTransactions = async(req, res) => {
  try {
    const transactions = (await Transaction.find({ userId: req.user._id })).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createTransaction = async(req, res) => {
  try {
    const { amount, category,type, date, description } = req.body;
    
    // Validating input
     if (!type || !amount || !date) {
      return res.status(400).json({ message: "Type, amount, and date are required" });
    }

    
    if (type === "expense" && (!category || !description)) {
      return res.status(400).json({ message: "Category and description are required for expense" });
    }

    // For income,  ignoring category/description
    const newTransaction = new Transaction({
      type,
      amount,
      category: type === "income" ? "N/A" : category,
      description: type === "income" ? "N/A" : description,
      date,
      userId: req.user._id,
    });

    await newTransaction.save();

    return res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });

  } catch (error) {
    console.error('Error creating transaction:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  res.send('Create a new transaction');
}

export const updateTransaction = async(req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.amount = amount;
    transaction.category = category;
    transaction.date = date;
    transaction.description = description;

    await transaction.save();

    return res.json({ message: 'Transaction updated successfully', transaction });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } 
 
}

export const deleteTransaction = async(req, res) => {
    console.log(req.params.id);
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


export const filterTransactions = async (req, res) => {
  try {
    const { filterType, category, fromDate, toDate } = req.query;
    let filter = { userId: req.user._id };

    if (filterType === "category" && category) {
      filter.category = category;
    } else if (filterType === "date" && fromDate && toDate) {
      filter.date = { $gte: fromDate, $lte: toDate };
    }

    const transactions = await Transaction.find(filter);  
    res.json(transactions);
  } catch (error) {
    console.error('Error filtering transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const downloadTransactions = async (req, res) => {
  try {
    const { from, to } = req.query;
    console.log("Download request for:", { from, to });

    if ( !from || !to ) {
      return res.status(400).json({ message: "userId, from, to, and username are required" });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    const userId = req.user._id;

   
    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: fromDate, $lte: toDate },
    }).sort({ date: -1 });

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found for this date range." });
    }

    // Convert to CSV
    const fields = ["type", "amount", "category", "date", "description"];
    const parser = new Parser({ fields });
    const csv = parser.parse(transactions);

    const username ="csv report";
    // Send as downloadable file
    res.header("Content-Type", "text/csv");
    res.attachment(`${username.replace(/\s+/g, "_")}.csv`);
    res.send(csv);
  } catch (error) {
    console.error("CSV download error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
