import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../libs/axios';
import {listCategories, createCategory} from "../actions/categoryAction";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const categoriesList = useSelector((state) => state.categoriesList);
  const { loading, categories } = categoriesList;

  const categorySave = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = categorySave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listCategories());
    return () => {
      //
    };
  }, [successSave]);

  const openModal = (category) => {
    setModalVisible(true);
    setId(category._id);
    setName(category.name);
    setDescription(category.description);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCategory({
        _id: id,
        name,
        image,
        description,
      })
    );
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

  return !loading && (
    <div className="content content-margined">
      <div className="category-header">
        <h3>Жанри</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Додати жанр
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Додати жанр</h2>
              </li>
              <li>
                {loadingSave && <div>Завантаження...</div>}
                {errorSave && <div style={{ color: "red" }}>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Назва</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Фото</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Завантаження...</div>}
              </li>
              <li>
                <label htmlFor="description">Опис</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Редагувати' : 'Додати'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Назад
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="category-list">
        <table className="table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Назва</th>
              <th>Опис</th>
              <th>Дія</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  <img src={category.image} alt="category" style={{ height: '30px'}}></img></td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button className="button" onClick={() => openModal(category)}>
                    Редагувати
                  </button>{' '}
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
