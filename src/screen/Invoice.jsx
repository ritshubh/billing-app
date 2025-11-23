import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaWhatsapp, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Invoice.css";

const Invoice = () => {
	const [invoices, setInvoices] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const savedInvoices =
			JSON.parse(localStorage.getItem("invoices")) || [];
		setInvoices(savedInvoices);
	}, []);

	const handleAddInvoice = () => {
		navigate("/add-invoice");
	};

	return (
		<div className="table-container">
			<div className="top-bar">
				<input
					type="text"
					className="search-input"
					placeholder="Search"
				/>

				<select className="filter-select">
					<option>All</option>
					<option>Paid</option>
					<option>Unpaid</option>
					<option>Sent</option>
				</select>

				<button className="add-btn" onClick={handleAddInvoice}>
					Add Invoice
				</button>
			</div>

			<table className="custom-table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Invoice No.</th>
						<th>Party Name</th>
						<th>Status</th>
						<th>Amount</th>
						<th>Due Amount</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{invoices.length === 0 ? (
						<tr>
							<td colSpan="7" style={{ textAlign: "center" }}>
								No invoices found
							</td>
						</tr>
					) : (
						invoices.map((inv, index) => (
							<tr key={index}>
								<td>{inv.date}</td>
								<td>{inv.invoiceNo}</td>
								<td>{inv.partyName}</td>

								<td>
									<span className="status-badge sent">
										{inv.status}
									</span>
								</td>

								<td>{inv.amount}</td>
								<td>{inv.dueAmount}</td>

								<td className="action-buttons">
									<button className="icon-btn edit-btn">
										<FaEdit />
									</button>
									<button className="icon-btn view-btn">
										<FaEye />
									</button>
									<button className="icon-btn whatsapp-btn">
										<FaWhatsapp />
									</button>
									<button className="icon-btn delete-btn">
										<FaTrash />
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Invoice;
