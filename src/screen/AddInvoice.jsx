import React, { useState } from "react";
import "../css/AddInvoice.css";
import { useNavigate } from "react-router-dom";
const AddInvoice = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		partyName: "",
		invoiceNo: "",
		date: "",
		dueDate: "",
		amount: "",
		dueAmount: "",
	});

	const [items, setItems] = useState([
		{
			item: "",
			description: "",
			qty: 1,
			unit: "",
			price: 0,
			discount: 0,
			total: 0,
		},
	]);

	const handleChange = (e) => {
		setFormData({ ...formData });
	};

	const handleItemChange = (field, value) => {
		const newItem = { ...items[0], [field]: value };

		const qty = Number(newItem.qty) || 0;
		const price = Number(newItem.price) || 0;
		const discount = Number(newItem.discount) || 0;

		const amount = qty * price;
		const discountAmount = amount * (discount / 100);

		newItem.total = isNaN(amount - discountAmount)
			? "0.00"
			: (amount - discountAmount).toFixed(2);

		setItems([newItem]);
	};

	const handleSave = () => {
		let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

		// const newInvoice = {
		// 	date: formData.date,
		// 	invoiceNo: formData.invoiceNo,
		// 	partyName: formData.partyName,
		// 	status: "Sent",
		// 	amount: formData.amount || "0.00",
		// 	dueAmount: formData.dueAmount || "0.00",
		// };
		const newInvoice = {
			...formData,
			status: "Sent",
			items: items[0],
		};
		invoices.push(newInvoice);

		localStorage.setItem("invoices", JSON.stringify(invoices));

		navigate("/invoice");
	};

	return (
		<>
			{/* PAGE HEADER */}
			<div className="header">
				<h2>Create Invoice</h2>
			</div>

			{/* BASIC DETAILS */}
			<div className="card">
				<h3>Invoice Details</h3>

				<div className="form-row">
					<div className="form-group">
						<label>Party Name *</label>
						<select name="partyName" onChange={handleChange}>
							<option>Choose Party</option>
							<option>Walk-in Customer</option>
							<option>Sanskar Men's Wear</option>
						</select>
					</div>

					<div className="form-group">
						<label>Invoice No *</label>
						<input
							type="text"
							placeholder="Enter Invoice Number"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Date *</label>
						<input type="date" onChange={handleChange} />
					</div>

					<div className="form-group">
						<label>Due Date</label>
						<input type="date" onChange={handleChange} />
					</div>
				</div>
			</div>

			{/* ADDITIONAL FIELDS */}
			<div className="card">
				<h3>Additional Fields</h3>

				<div className="form-row">
					<div className="form-group">
						<label>Billing Address</label>
						<select onChange={handleChange}>
							<option>Choose Address</option>
						</select>
					</div>

					<div className="form-group">
						<label>Shipping Address</label>
						<select onChange={handleChange}>
							<option>Choose Address</option>
						</select>
					</div>

					<div className="form-group">
						<label>Sales Person</label>
						<select onChange={handleChange}>
							<option>Choose Sales Person</option>
						</select>
					</div>

					<div className="form-group">
						<label>Sales By</label>
						<input
							type="text"
							value="Sumer Jagati"
							readOnly
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Price List</label>
						<select onChange={handleChange}>
							<option>Choose Price List</option>
						</select>
					</div>

					<div className="form-group">
						<label>Reference Number</label>
						<input
							type="text"
							placeholder="Enter Reference Number"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group full-width">
						<label>Template *</label>
						<select onChange={handleChange}>
							<option>Default Invoice Template</option>
						</select>
					</div>
				</div>
			</div>

			{/* ITEMS SECTION */}
			<div className="card">
				<h3>Items</h3>

				<div className="items-table-wrapper">
					<table className="items-table">
						<thead>
							<tr>
								<th>Item *</th>
								<th>Description</th>
								<th>Qty</th>
								<th>Unit</th>
								<th>Price/Unit</th>
								<th>Discount %</th>
								<th>Total</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>
									<select
										onChange={(e) =>
											handleItemChange(
												"item",
												e.target.value
											)
										}
									>
										<option>Choose Item</option>
									</select>
								</td>

								<td>
									<input
										type="text"
										value={items.description}
										placeholder="Description"
										onChange={(e) =>
											handleItemChange(
												"description",
												e.target.value
											)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										min="1"
										value={items.qty}
										defaultValue={1}
										onChange={(e) =>
											handleItemChange(
												"qty",
												e.target.value
											)
										}
									/>
								</td>

								<td>
									<select
										onChange={(e) =>
											handleItemChange(
												"unit",
												e.target.value
											)
										}
										value={items.unit}
									>
										<option>Select Unit</option>
									</select>
								</td>

								<td>
									<input
										type="number"
										placeholder="0"
										value={items.price}
										onChange={(e) =>
											handleItemChange(
												"price",
												e.target.value
											)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										placeholder="0%"
										value={items.discount}
										onChange={(e) =>
											handleItemChange(
												"discount",
												e.target.value
											)
										}
									/>
								</td>
								<td>{items[0].total}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<button className="add-row-btn">+ Add Row</button>
			</div>

			{/* PAYMENT DETAILS */}
			<div className="card">
				<h3>Payment Details</h3>

				<div className="form-row">
					<div className="form-group">
						<label>Payment Amount</label>
						<input
							type="number"
							placeholder="0"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Balance Amount</label>
						<input
							type="text"
							value="0.00"
							readOnly
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>

			{/* NOTES */}
			<div className="card">
				<h3>Terms & Notes</h3>

				<textarea
					placeholder="Enter notes for client..."
					rows="4"
				></textarea>

				<div className="upload-box">
					Drag images here or click to upload
				</div>
			</div>

			{/* TOTALS */}
			<div className="total-box">
				<p>
					Subtotal: <span>0.00</span>
				</p>
				<p>
					Round Off: <span>0.00</span>
				</p>
				<h3>
					Total: <span>0.00</span>
				</h3>
			</div>

			{/* ACTION BUTTONS */}
			<div className="form-actions">
				<button className="cancel-btn">Cancel</button>
				<button className="draft-btn">Save Draft</button>
				<button className="save-btn" onClick={handleSave}>
					Save
				</button>
			</div>
		</>
	);
};

export default AddInvoice;
