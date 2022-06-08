import categoryRepository from './category.repository';

const getActiveCategories = async () => categoryRepository.findActiveCategories();

const getCategoryByName = async (name) => categoryRepository.findCategoryByName(name);

const createCategory = async (category) => categoryRepository.createCategory(category);

const updateCategoryById = async (id, category) => categoryRepository.updateCategoryById(id, category);

module.exports = {
  getActiveCategories,
  getCategoryByName,
  createCategory,
  updateCategoryById,
};
