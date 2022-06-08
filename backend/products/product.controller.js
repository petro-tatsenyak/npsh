import productService from './product.service';
import categoryService from '../categories/category.service';

const getProductsByCategory = async (req, res, next) => {
  const { category: categoryName, searchKeyword, sortOrder } = req.query;

  try {
    const category = await categoryService.getCategoryByName(categoryName);

    if (categoryName && !category) {
      return res.status(404).send({ message: 'Category Not Found' });
    }

    const products = await productService.getProductsByCategory(
      category && category.id,
      searchKeyword,
      sortOrder,
    );

    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductsBySeller = async (req, res, next) => {
  const { isAdmin, isSeller, _id } = req.user;

  try {
    if (!isAdmin && !isSeller) return res.status(401).send({ message: 'Your Not Seller.' });

    const products = await productService.getSellerProducts(
        !isAdmin && _id,
    );

    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);

    if (!product) return res.status(404).send({ message: 'Product Not Found.' });

    return res.send(product);
  } catch (error) {
    return next(error);
  }
};

const addReviewForProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, rating, comment } = req.body;

  try {
    const review = {
      name,
      rating: Number(rating),
      comment,
    };

    const product = await productService.addReviewForProductById(id, review);

    if (!product || !product.reviews) {
      return res.status(404).send({ message: 'Product Not Found' });
    }

    return res.status(201).send({
      data: product.reviews[product.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const category = await categoryService.getCategoryByName(update.category);

    if (!category) {
      return res.status(404).send({ message: 'Category Not Found' });
    }

    update.category = category.id;

    const product = await productService.updateProductById(id, update);

    if (!product) {
      return res.status(404).send({ message: 'Product Not Found' });
    }

    return res.status(201).send({
      data: product,
      message: 'Product updated successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productService.deleteProductById(id);

    if (!product) {
      return res.status(404).send({ message: 'Product Not Found' });
    }

    return res.status(201).send({
      data: product,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  const product = req.body;

  try {
    const category = await categoryService.getCategoryByName(product.category);

    if (!category) {
      return res.status(404).send({ message: 'Category Not Found' });
    }

    product.category = category.id;

    const newProduct = await productService.createProduct(product);

    if (!newProduct) {
      return res.status(404).send({ message: 'Product Not Created' });
    }

    return res.status(204).send({
      data: newProduct,
      message: 'Product created successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProductsByCategory,
  getProductsBySeller,
  getProductId,
  addReviewForProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
