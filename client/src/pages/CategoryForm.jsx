import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation } from 'react-router-dom';
import { updateCategory, addCategory, getCategory } from '../apiCalls/categoryApis';
import './CategoryForm.css';
import { useDispatch, useSelector } from 'react-redux';

const CategoryForm = () => {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string(),
	});

	const [category, setCategory] = useState({ name: '', description: '' });
	const dispatch = useDispatch();
	const location = useLocation();
	const { state } = location;
	const id = state ? state.id : null;

	const { categories } = useSelector(state => state.category);

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const foundCategory = categories.find(category => category._id === id);
				setCategory(foundCategory);
			} catch (error) {
				console.error('Error fetching category:', error);
			}
		};
		if (id) {
			fetchCategory();
		}
	}, [category]);

	const handleSubmit = async (values) => {

		try {
			if (id) {
				await updateCategory(dispatch, { ...values });
				setCategory(values);
			} else {
				console.log(category)
				const res = await addCategory(dispatch, values);
				setCategory(res.data.category);
			}
		} catch (error) {
			console.error('Error updating product:', error);
		}
	};

	return (
		<div className='form-container'>
			<Formik
				initialValues={category}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				<Form className='form-wrapper'>
					<div className="mb-4">
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<Field
							id="name"
							name="name"
							type="text"
							autoComplete="off"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						<ErrorMessage name="name" component="div" className="text-red-500 text-sm text-right font-medium" />
					</div>
					<div className="mb-4">
						<label htmlFor="description" className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<Field
							id="description"
							name="description"
							type="text"
							autoComplete="off"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						<ErrorMessage name="description" component="div" className="text-red-500 text-sm text-right" />
					</div>
					<button
						type="submit"
						className="submit-btn inline-flex items-center mt-3 text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</Form>
			</Formik>

			<div className='back-btn'>
			<Link to="/categories" className="btn rounded pt-2 pb-1 py-3 rounded-tr-none back-link text-slate-200 m-0">
					{'<---- Back'}
				</Link>
			</div>
		</div>
	);
};

export default CategoryForm;
