import React from 'react'
import "./CategoryList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory, getCategories } from '../apiCalls/categoryApis';

const CategoryList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { categories } = useSelector((state) => state.category);

	useEffect(() => {
		getCategories(dispatch);
	}, [dispatch])

	const handleDelete = (id) => {
		deleteCategory(dispatch, id);
	};

	const handleCreate = () => {
		navigate(`/category`);
	}

	const columns = [
		{
			field: "id", headerName: "ID", width: 300,
			renderCell: (params) => {
				return (
					<div className="categoryListItem">
						{params.row._id}
					</div>
				);
			},
		},
		{
			field: "category",
			headerName: "Category",
			width: 230,
			renderCell: (params) => {
				return (
					<div className="categoryListItem">
						{params.row.name}
					</div>
				);
			},
		},
		{
			field: "price",
			headerName: "Price",
			width: 260,
			renderCell: (params) => {
				return (
					<div className="categoryListItem">
						{params.row.description}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<div className='action-btns'>
						<Link to={"/category"}
							state={{ id: params.row._id }}>
							<button className="categoryListEdit"
							>Edit</button>
						</Link>
						<DeleteOutlineIcon
							className="categoryListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</div>
				);
			},
		},
	];

	return (
		<div className="categoryList flex flex-col bg-slate-100 m-9">
			<div className='create-btn'>
				<button className='btn block' onClick={() => { handleCreate() }}>Create Category</button>
			</div>
			{categories && <DataGrid
				rows={categories}
				disableSelectionOnClick
				columns={columns}
				getRowId={row => row._id}
			/>}
		</div>
	);
}

export default CategoryList