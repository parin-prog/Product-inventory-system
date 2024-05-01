import React from 'react'
import "./ProductList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProducts, deleteProduct } from '../apiCalls/productApis';

const ProductList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { products } = useSelector((state) => state.product.products);
	console.log(products)

	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch])

	const handleDelete = (id) => {
		deleteProduct(dispatch, id);
	};

	const columns = [
		{
			field: "id", headerName: "ID", width: 260,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						{params.row._id}
					</div>
				);
			},
		},
		{
			field: "product",
			headerName: "Product",
			width: 250,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						<img className="productListImg" src={params.row.img} alt="" />
						{params.row.name}
					</div>
				);
			},
		},
		{
			field: "status", headerName: "Status", width: 200,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						{params.row.status === 1 ? "Available" : ""}
					</div>
				);
			},
		},
		{
			field: "price",
			headerName: "Price",
			width: 160,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						{params.row.price}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 250,
			renderCell: (params) => {
				return (
					<div className='action-btns'>
						<Link to={"/product"}
							state={{ id: params.row._id }} className="productListEdit">
							Edit
						</Link>
						<DeleteOutlineIcon
							className="productListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</div>
				);
			},
		},
	];

	return (
		<div className="productList bg-slate-100">
			<div className='create-btn'>
				<Link to={"/product"} className='btn block'>Add Product</Link>
			</div>
			{products && <DataGrid
				rows={products}
				disableSelectionOnClick
				columns={columns}
				getRowId={row => row._id}
			/>}
		</div>
	);
}

export default ProductList