import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateProduct, addProduct, getProductCategories } from '../apiCalls/productApis';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../apiCalls/categoryApis';
import CheckboxChips from '../components/ui/CheckboxChips';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    status: 0,
    category: [],
    img: '',
    price: 0
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const id = state ? state.id : null;
  const { products } = useSelector(state => state.product.products);
  const { categories } = useSelector(state => state.category);
  const [catIds, setCatIds] = useState([]);



  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.number().required('Status is required'),
    category: Yup.array().required('Category is required'),
    img: Yup.string().url('Invalid URL').required('Image URL is required'),
    price: Yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
  });

  useEffect(() => {
    const initPerform = async () => {
      await getCategories(dispatch);
    }
    const fetchProduct = async () => {
      try {
        const foundProduct = products.find(prod => prod._id === id);

        setProduct(foundProduct);
        setCatIds([...product.category]);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (id) {
      fetchProduct();
      initPerform();
    } else {
      initPerform();
    }

  }, [product]);

  const handleSubmit = async (vals) => {
    const values = { ...vals, category: catIds };
    console.log("Form data :", values)
    try {
      if (id) {
        await updateProduct(dispatch, { ...values });
        // setCategory(values);
      } else {
        // console.log(category)
        const res = await addProduct(dispatch, values);
        console.log("Added Prod :", res)
        // setCategory(res.data.category);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  console.log("CatIDs: ", catIds)

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="form-container my-6">
      <div className="w-2/3 mx-auto flex justify-center">
        <Formik
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className='form my-9'>
            <h1 className="text-2xl font-bold mb-7">Edit Product</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Field type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <ErrorMessage name="name" component="div" className="error-msg text-right text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Field type="text" id="description" name="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <ErrorMessage name="description" component="div" className="error-msg text-right text-red-500 text-sm mt-1 end" />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <Field type="number" id="status" name="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <ErrorMessage name="status" component="div" className="error-msg text-right text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <CheckboxChips category={catIds} changeCategory={setCatIds} />

              <ErrorMessage name="category" component="div" className="error-msg text-right text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="img" className="block text-sm font-medium text-gray-700">Image URL</label>
              <Field type="text" id="img" name="img" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <ErrorMessage name="img" component="div" className="error-msg text-right text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <Field type="text" id="price" name="price" onKeyDown={(e) => {
                if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8)) {
                  e.preventDefault();
                }
              }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <ErrorMessage name="price" component="div" className="error-msg text-right text-red-500 text-sm mt-1" />
            </div>

            <button type="submit" className="btn">Submit</button>
          </Form>
        </Formik>
      </div>

      <div className='back-btn'>
        <Link to="/products" className="btn rounded pt-2 pb-1 py-3 rounded-tr-none back-link text-slate-200 m-0">
          {'<---'}&nbsp;&nbsp;{'Back'}
        </Link>
      </div>
    </div>
  );
};

export default ProductForm;
