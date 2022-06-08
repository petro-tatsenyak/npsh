import productModel from './product.model';

const findProductById = async (id) => productModel.findById(id).populate('category', 'name');

const getProductsByCategory = async (categoryId, search, compare) => {
  const category = categoryId ? { category: categoryId } : {};

  return productModel.find({ ...category, ...search }).populate('category', 'name').sort(compare || { countInStock: 1 });
};

const getSellerProducts = async (sellerId) => {
  const seller = sellerId ? { seller: sellerId } : {};

  return productModel.find({ ...seller }).populate('category', 'name').sort({ countInStock: 1 });
};

const findProductByIdAndUpdate = async (id, update) => productModel.findByIdAndUpdate(id, update, { new: true });

const findProductByIdAndDelete = async (id) => productModel.findByIdAndDelete(id);

const createProduct = async (product) => productModel.create(product);

module.exports = {
  findProductById,
  getProductsByCategory,
  findProductByIdAndUpdate,
  findProductByIdAndDelete,
  createProduct,
  getSellerProducts,
};
