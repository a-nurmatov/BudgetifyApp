import Category from "../models/category.js";

export const getAllCategories = async (req, res, next) => {
  try {
    let { userId } = req.params;
    let categories = await Category.find({ userId });
    res.json({ message: "List of all categories", categories });
  } catch (error) {
    next(error);
  }
};

export const addListOfNewCategories = async (req, res, next) => {
  try {
    let { newCategoriesToAdd } = req.body;
    let newCategories = await Category.insertMany(newCategoriesToAdd);
    let response = newCategories.map((category) => category._id);
    res.json({ message: "List of new categories added", response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addNewCategory = async (req, res, next) => {
  try {
    let newCategory = new Category(req.body);
    await newCategory.save();
    res.json({ message: "New category created", newCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updatedCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;
    let updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ message: "Category updated", updatedCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;
    let deletedCategory = await Category.findOneAndDelete({ _id: categoryId });
    res.json({ message: "Category deleted", deletedCategory });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
