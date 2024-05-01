import { publicRequest } from "../../requestMethods";
import {
	addCategoryFailure, addCategoryStart, addCategorySuccess,
	deleteCategoryFailure, deleteCategoryStart, deleteCategorySuccess, getCategoryFailure,
	getCategoryStart, getCategorySuccess, updateCategoryFailure, updateCategoryStart,
	updateCategorySuccess, getCategoriesStart,
	getCategoriesFailure,
	getCategoriesSuccess
} from "../redux/categoryReducer";

export const getCategories = async (dispatch) => {
	dispatch(getCategoriesStart());
	try {
		const res = await publicRequest.get("/categories");
		dispatch(getCategoriesSuccess(res.data.cat));
	} catch (err) {
		dispatch(getCategoriesFailure());
	}
}

export const deleteCategory = async (dispatch, id) => {
	dispatch(deleteCategoryStart());
	try {
		const res = await publicRequest.delete(`/categories/${id}`);
		dispatch(deleteCategorySuccess(res.data.cat));
	} catch (err) {
		dispatch(deleteCategoryFailure());
	}
}

export const addCategory = async (dispatch, cat) => {
	dispatch(addCategoryStart());
	try {
		const res = await publicRequest.post(`/categories`, cat);
		dispatch(addCategorySuccess(res.data.cat));
	} catch (err) {
		dispatch(addCategoryFailure());
	}
}

export const updateCategory = async (dispatch, values) => {
	const { _id, name, description} = values;
	const customObj = { name, description};

	dispatch(updateCategoryStart());
	try {
		const res  = await publicRequest.put(`/categories/${_id}`, customObj);
		dispatch(updateCategorySuccess(res.data.cat));
	} catch (err) {
		dispatch(updateCategoryFailure());
	}
}

export const getCategory = async (dispatch, id) => {
	dispatch(getCategoryStart());
	try {
		const res = await publicRequest.get(`/categories/${id}`);
		dispatch(getCategorySuccess());
	} catch (err) {
		dispatch(getCategoryFailure());
	}
}