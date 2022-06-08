import productRepository from './product.repository';

const getProductsByCategory = async (categoryId, searchKeyword, sortOrder, seller) => {
  const search = searchKeyword
    ? {
      name: {
        $regex: searchKeyword,
        $options: 'i',
      },
    }
    : {};

  const compare = sortOrder
    && ((sortOrder === 'lowest')
      ? { price: 1 }
      : { price: -1 });

  const products = await productRepository.getProductsByCategory(categoryId, search, compare, seller);

  return products;
};

const getSellerProducts = async (id) => productRepository.getSellerProducts(id);

const getProductById = async (id) => productRepository.findProductById(id);

const addReviewForProductById = async (id, review) => {
  const update = {
    $push: { reviews: review },
  };

  return productRepository.findProductByIdAndUpdate(id, update);
};

const updateProductById = async (id, update) => productRepository.findProductByIdAndUpdate(id, update);

const deleteProductById = async (id) => productRepository.findProductByIdAndDelete(id);

const createProduct = async (product) => productRepository.createProduct(product);

module.exports = {
  getProductsByCategory,
  getSellerProducts,
  getProductById,
  addReviewForProductById,
  updateProductById,
  deleteProductById,
  createProduct,
};
