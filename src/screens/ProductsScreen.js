import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../libs/axios';
import {
  saveProduct,
  deleteProdcut,
  listSellerProducts,
} from '../actions/productActions';
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import SimpleFileUpload from 'react-simple-file-upload'

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productSellerList = useSelector((state) => state.productSellerList);
  const { productsSeller: products } = productSellerList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categoriesList);
  const { categories } = categoriesList;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listSellerProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setAuthor(product.author);
    setCategory(product.category ? product.category.name : '');
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        author,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>???????????? ???????? </h3>
        <button className="button primary" onClick={() => openModal({})}>
          ????????????
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>???????????? ??????????</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">??????????</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">????????</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">????????</label>
                <input
                    type="text"
                    name="image"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="author">??????????</label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  id="author"
                  onChange={(e) => setAuthor(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">???????????? ??????????????????</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">????????</label>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                        labelId="categor??"
                        id="category-select"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map(({ name }) => (
                        <MenuItem value={name}>{name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </li>
              <li>
                <label htmlFor="description">????????</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? '??????????????' : '????????????????'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  ??????????
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>??????????</th>
              <th>????????</th>
              <th>????????</th>
              <th>??????????</th>
              <th>??????</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>{product.author}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    ????????????????????
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    ????????????????
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
