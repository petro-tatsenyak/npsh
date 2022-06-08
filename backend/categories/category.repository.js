import categoryModel from './category.model';

const findActiveCategories = async () => categoryModel.find();

const findCategoriesByIds = async (ids) => categoryModel.find({ _id: { $in: ids } });

const findCategoryByName = async (name) => categoryModel.findOne({ name });

const findCategoryById = async (id) => categoryModel.findById(id);

const createCategory = async (category) => categoryModel.create(category);

const updateCategoryById = async (id, category) => categoryModel.updateOne({ _id: id }, category);

module.exports = {
  findActiveCategories,
  findCategoriesByIds,
  findCategoryByName,
  findCategoryById,
  createCategory,
  updateCategoryById,
};
