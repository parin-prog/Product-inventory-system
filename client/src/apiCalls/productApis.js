import { publicRequest } from "../../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "../redux/productRedux";

export const getProducts = async (dispatch) => {
	dispatch(getProductStart());
	try {
		const res = await publicRequest.get("/products");
		console.log(res._doc)
		dispatch(getProductSuccess(res.data));
	} catch (err) {
		dispatch(getProductFailure());
	}
}

export const deleteProduct = async (dispatch, id) => {
	dispatch(deleteProductStart());
	try {
		const res = await publicRequest.delete(`/products/${id}`);
		dispatch(deleteProductSuccess(res.data));
	} catch (err) {
		dispatch(deleteProductFailure());
	}
}

export const getProduct = async (dispatch, id) => {
	dispatch(getProductStart());
	try {
		const res = await publicRequest.get(`/products/${id}`);
	} catch (err) {
		dispatch(getProductFailure());
	}
}

export const updateProduct = async (dispatch, id) => {
	dispatch(updateProductStart());
	try {
		const res = await publicRequest.put(`/products/${id}`);
		dispatch(updateProductSuccess(res.data.product));
	} catch (err) {
		dispatch(updateProductFailure());
	}
}

export const addProduct = async (dispatch, prod) => {
	dispatch(addProductStart());
	try {
		const res = await publicRequest.post(`/products`, prod);
		dispatch(addProductSuccess(res.data));
	} catch (err) {
		dispatch(addProductFailure());
	}
}

export const getProductCategories = async (id) => {
	try {
		const res = await publicRequest.get(`/products/categories/${id}`);
		return res.data;
	} catch (err) {
		console.error(err);
	}
}