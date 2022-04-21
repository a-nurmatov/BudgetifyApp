import Transaction from "../models/transaction.js";

export const getAllTransactions = async (req, res, next) => {
  try {
    let transactions = await Transaction.find().populate("categories");
    res.json({ message: "List of all transactions", transactions });
  } catch (error) {
    next(error);
  }
};

export const getAccountTransactions = async (req, res, next) => {
  try {
    let { accountId } = req.params;
    let transactions = await Transaction.find({
      accountId: accountId,
    }).populate("categories");
    res.json({
      message: "All account transactions",
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    let newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.json({ message: "Transaction created", newTransaction });
  } catch (error) {
    next(error);
  }
};

export const getIncomeTransactions = async (req, res) => {
  let { accountId } = req.params;
  let transactions = await Transaction.find({ accountId: accountId }).where({
    type: "income",
  });
  res.json({
    message: "Income transactions",
    transactions,
  });
};

export const getExpenseTransactions = async (req, res) => {
  let { accountId } = req.params;
  let transactions = await Transaction.find({ accountId: accountId }).where({
    type: "expense",
  });
  res.json({
    message: "Expense transactions",
    transactions,
  });
};

export const updateTransaction = async (req, res, next) => {
  try {
    let { transactionId } = req.params;
    let updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transactionId },
      req.body,
      { new: true, runValidators: true }
    );
    res.json({
      message: "Transaction updated",
      updatedTransaction,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    let { transactionId } = req.params;
    let deletedTransaction = await Transaction.findOneAndRemove({
      _id: transactionId,
    });
    res.json({
      message: "Transaction deleted",
    });
  } catch (error) {
    next(error);
  }
};
