import categoryService from './category.service';

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getActiveCategories();

    return res.json(categories);
  } catch (error) {
    return next(error);
  }
};

const createCategory = async (req, res, next) => {
  const category = req.body;

  try {
    const newCategory = await categoryService.createCategory(category);

    if (!newCategory) {
      return res.status(500).send({ message: 'Category Not Created' });
    }

    return res.status(204).send({
      data: newCategory,
      message: 'Category created successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = req.body;

  try {
    const updatedCategory = await categoryService.updateCategoryById(id, category);

    if (!updatedCategory) {
      return res.status(404).send({ message: 'Category Not Found' });
    }

    return res.status(204).send({
      data: updatedCategory,
      message: 'Category updated successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
};
