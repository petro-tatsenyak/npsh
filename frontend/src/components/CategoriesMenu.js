import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import {listCategories} from "../actions/categoryAction";

function CategoriesScreen() {
    const categories = useSelector((state) => state.categoriesList.categories);

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);


    const closeMenu = () => {
        document.querySelector('.sidebar').classList.remove('open');
    };
    return !!categories && (
        <aside className="sidebar">

            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <h3>Жанри</h3>

            <ul className="categories">
                {(categories || []).map(category => (
                    <li>
                        <Link style={{
                            textDecoration: "none",
                        }}
                              to={`/category/${category.name}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
export default CategoriesScreen;
