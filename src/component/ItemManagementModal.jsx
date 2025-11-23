import React from 'react'

const ItemManagementModal = ({handleChange, formData, setFormData, editIndex,setShowForm, handleSubmit}) => {
  return (
    
       <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>{editIndex !== null ? "Edit Item" : "Add Item"}</h2>

              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✖
              </button>
            </div>

            <div className="modal-body">
              <form className="add-item-form" onSubmit={handleSubmit}>
                <label>Item Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <label>Barcode</label>
                <input
                  type="number"
                  name="Barcode"
                  value={formData.Barcode}
                  onChange={handleChange}
                />

                <label>Category Name</label>
                <input
                  type="text"
                  name="CategoryName"
                  value={formData.CategoryName}
                  onChange={handleChange}
                />

                <label>Status</label>
                <select
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <h3>Pricing Details</h3>

                <label>Sales Price*</label>
                <input
                  type="number"
                  name="SalesRate"
                  value={formData.SalesRate}
                  onChange={handleChange}
                />

                <label>Purchase Price</label>
                <input
                  type="number"
                  name="PurchaseRate"
                  value={formData.PurchaseRate}
                  onChange={handleChange}
                />

                <label>Discount Type</label>
                <div className="discount-toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${
                      formData.DiscountType === "rs" ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, DiscountType: "rs" })
                    }
                  >
                    ₹
                  </button>

                  <button
                    type="button"
                    className={`toggle-btn ${
                      formData.DiscountType === "percentage" ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, DiscountType: "percentage" })
                    }
                  >
                    %
                  </button>
                </div>

                <label>
                  Discount{" "}
                  {formData.DiscountType === "percentage" ? "(%)" : "(₹)"}
                </label>
                <input
                  type="number"
                  name="DiscountValue"
                  value={formData.DiscountValue}
                  onChange={handleChange}
                />

                <label>Available Stock</label>
                <input
                  type="number"
                  name="AvailableStock"
                  value={formData.AvailableStock}
                  onChange={handleChange}
                />

                <button className="submit-btn">
                  {editIndex !== null ? "Update Item" : "Save Item"}
                </button>
              </form>
            </div>
          </div>
        </div>
  
  )
}

export default ItemManagementModal
