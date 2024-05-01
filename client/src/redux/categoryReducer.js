import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
	name: "category",
	initialState: {
		categories: [],
		isFetching: false,
		error: false
	},
	reducers: {
		// GET ALL
		getCategoriesStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getCategoriesSuccess: (state, action) => {
			state.categories = action.payload;
			state.isFetching = true;
			state.error = false;
		},
		getCategoriesFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		// GET 
		getCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getCategorySuccess: (state, action) => {
			state.isFetching = true;
			state.error = false;
		},
		getCategoryFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		// DELETE
		deleteCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteCategorySuccess: (state, action) => {
			state.categories.splice(
				state.categories.findIndex(item => item._id === action.payload),
				1
			)
			state.isFetching = true;
			state.error = false;
		},
		deleteCategoryFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		// Update 
		updateCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateCategorySuccess: (state, action) => {
			state.categories[state.categories.findIndex((item) => item._id === action.payload._id)
			] = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		updateCategoryFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		// Add 
		addCategoryStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		addCategorySuccess: (state, action) => {
			state.categories.push(action.payload);
			state.isFetching = true;
			state.error = false;
		},
		addCategoryFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		}
	}
});

export const { getCategoryStart, getCategoryFailure, getCategorySuccess,
	deleteCategoryStart, deleteCategoryFailure, deleteCategorySuccess,
	updateCategoryStart, updateCategoryFailure, updateCategorySuccess,
	addCategoryStart, addCategoryFailure, addCategorySuccess,
	getCategoriesStart, getCategoriesSuccess, getCategoriesFailure } = categorySlice.actions;

export default categorySlice.reducer;