import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function CheckboxChip({ category, changeCategory }) {
	const [selected, setSelected] = React.useState([]);
	const [status, setStatus] = React.useState(true);
	const [allCategories, setAllCategories] = React.useState();
	const { categories } = useSelector(state => state.category);


	React.useEffect(() => {
		const fetchCategories = async () => {
			if (status) {
				const names = categories.map(cat => {
					if (category.includes(cat._id)) {
						return cat.name
					} else {
						return null;
					}
				}).filter(name => name !== null);
				setSelected(names);
				setStatus(false);
			}
			const categoryNames = categories.map(category => category.name);
			setAllCategories(categoryNames);
		}

		const fetchProdCategories = async () => {

			const catData = categories.filter((cat) => selected.includes(cat.name));
			console.log("CategoryData", catData);
			const selectedIds = catData.map((cat) => cat._id);
			console.log("SelectedIDs:", selectedIds)
			changeCategory([...category, ...selectedIds]);
		}

		fetchCategories();
		fetchProdCategories();
	}, [selected])


	const handleChange = (e, name) => {

		console.log(name)
		setSelected((names) =>
			!e.target.checked
				? names.filter((n) => n !== name)
				: [...names, name]
		);
	}
	// console.log(product)


	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<div>
				<Box
					role="group"
					aria-labelledby="fav-movie"
					sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
				>
					{allCategories?.map((name) => {
						const checked = selected.includes(name);
						return (
							<Chip
								key={name}
								variant="plain"
								color={checked ? 'primary' : 'neutral'}
								startDecorator={
									checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
								}
							>
								<Checkbox
									variant="outlined"
									color={checked ? 'primary' : 'neutral'}
									disableIcon
									overlay
									label={name}
									checked={checked}
									onChange={(e) => handleChange(e, name)}
								/>
							</Chip>
						);
					})}
				</Box>
			</div>
		</Box>
	);
}