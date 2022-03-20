import Category from "../models/category.js";

export const getAllCategories = async (req, res) => {
  let categories = await Category.find();
  res.json({ message: "List of all categories", categories });
};

export const addNewCategory = async (req, res) => {
  let newCategory = new Category(req.body);
  await newCategory.save();
  res.json({ message: "Added new category", newCategory });
};

export const updateCategory = async (req, res) => {
  let { categoryId } = req.params;
  let updatedCategory = await Category.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({ message: "Category updated", updatedCategory });
};

export const deleteCategory = async (req, res) => {
  let { categoryId } = req.params;
  let deletedCategory = await Category.findOneAndRemove({ _id: categoryId });
  res.json({ message: "Category deleted", categories: await Category.find() });
};
