import React, { useState, useEffect } from "react";
import "../css/ItemManagement.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import ItemManagementModal from "../component/ItemManagementModal";

const ItemManagement = () => {
	const [showForm, setShowForm] = useState(false);
	const [editIndex, setEditIndex] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		Barcode: "",
		CategoryName: "",
		Status: "active",
		SalesRate: "",
		PurchaseRate: "",
		AvailableStock: "",
	});

	const [data, setData] = useState(() => {
		const saved = localStorage.getItem("itemsData");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("itemsData", JSON.stringify(data));
	}, [data]);

	const handleAdd = () => {
		setEditIndex(null);
		setFormData({
			name: "",
			Barcode: "",
			CategoryName: "",
			Status: "active",
			SalesRate: "",
			PurchaseRate: "",
			AvailableStock: "",
		});
		setShowForm(true);
	};

	const filteredData = data.filter((item) =>
		Object.values(item)
			.join(" ")
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	const handleEdit = (index) => {
		setEditIndex(index);
		setFormData(data[index]);
		setShowForm(true);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (editIndex !== null) {
			const updatedData = [...data];
			updatedData[editIndex] = formData;
			setData(updatedData);
		} else {
			setData([...data, formData]);
		}

		setShowForm(false);
	};

	const handleDelete = (index) => {
		const filtered = data.filter((_, i) => i !== index);
		setData(filtered);
	};

	return (
		<div className="table-container">
			<div className="top-bar">
				<input
					type="text"
					className="search-input"
					placeholder="Search items..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<button className="add-btn" onClick={handleAdd}>
					+ Add Item
				</button>
			</div>

			<table className="custom-table">
				<thead>
					<tr>
						<th>Item Name</th>
						<th>Barcode</th>
						<th>Category Name</th>
						<th>Status</th>
						<th>Sales Rate</th>
						<th>Purchase Rate</th>
						<th>Available Stock</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{filteredData.map((item, index) => (
						<tr key={index}>
							<td>{item.name}</td>
							<td>{item.Barcode}</td>
							<td>{item.CategoryName}</td>
							<td>
								<span className={`status-badge ${item.Status}`}>
									{item.Status}
								</span>
							</td>
							<td>{item.SalesRate}</td>
							<td>{item.PurchaseRate}</td>
							<td>{item.AvailableStock}</td>

							<td className="action-buttons">
								<button
									className="icon-btn edit-btn"
									onClick={() => handleEdit(index)}
								>
									<FaEdit />
								</button>

								<button
									className="icon-btn delete-btn"
									onClick={() => handleDelete(index)}
								>
									<FaTrash />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{showForm && (
				<ItemManagementModal
					handleChange={handleChange}
					formData={formData}
					setFormData={setFormData}
					editIndex={editIndex}
					setShowForm={setShowForm}
					handleSubmit={handleSubmit}
				/>
			)}
		</div>
	);
};

export default ItemManagement;
