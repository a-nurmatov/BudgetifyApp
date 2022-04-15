import IncomeCategory from "../models/incomeCategory.js";
import ExpenseCategory from "../models/expenseCategory.js";

export const getAllCategories = async (req, res) => {
  let { userId } = req.params;
  let incomeCategories = await IncomeCategory.find({ userId });
  let expenseCategories = await ExpenseCategory.find({ userId });

  let categories = [...incomeCategories, ...expenseCategories];
  res.json({ message: "List of all categories", categories });
};

export const addNewIncomeCategory = async (req, res, next) => {
  try {
    let newCategory = new IncomeCategory(req.body);
    await newCategory.save();
    res.json({ message: "Added new category", newCategory });
  } catch (error) {
    next(error);
  }
};

export const addNewExpenseCategory = async (req, res, next) => {
  try {
    let newCategory = new ExpenseCategory(req.body);
    await newCategory.save();
    res.json({ message: "Added new category", newCategory });
  } catch (error) {
    next(error);
  }
};

export const updateIncomeCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;
    let updatedCategory = await IncomeCategory.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ message: "Category updated", updatedCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateExpenseCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;
    let updatedCategory = await ExpenseCategory.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ message: "Category updated", updatedCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteIncomeCategory = async (req, res) => {
  let { categoryId } = req.params;
  let deletedCategory = await IncomeCategory.findOneAndRemove({
    _id: categoryId,
  });
  res.json({ message: "Category deleted" });
};

export const deleteExpenseCategory = async (req, res) => {
  let { categoryId } = req.params;
  let deletedCategory = await ExpenseCategory.findOneAndRemove({
    _id: categoryId,
  });
  res.json({ message: "Category deleted" });
};
