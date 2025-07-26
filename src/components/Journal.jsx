import React, { useState, useEffect } from 'react';
import spendingCategories from '../spending_data.json';

function Journal() {
  const [records, setRecords] = useState([]);
  // Form data state
  var today = new Date();
  var todayString = today.getFullYear() + '-' + 
                    String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(today.getDate()).padStart(2, '0');
  
  const [formData, setFormData] = useState({
    date: todayString,
    category: '',
    amount: '',
    description: ''
  });
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Load data when component starts
  useEffect(() => {
    var savedRecordsString = localStorage.getItem('spendingRecords');
    var savedCategoriesString = localStorage.getItem('customCategories');
    
    var savedRecords = [];
    var savedCategories = [];
    
    if (savedRecordsString) {
      savedRecords = JSON.parse(savedRecordsString);
    }
    
    if (savedCategoriesString) {
      savedCategories = JSON.parse(savedCategoriesString);
    }
    
    setRecords(savedRecords);
    setCustomCategories(savedCategories);
  }, []);

  // Save data to browser storage
  function saveToLocalStorage(records, categories) {
    localStorage.setItem('spendingRecords', JSON.stringify(records));
    localStorage.setItem('customCategories', JSON.stringify(categories));
  }

  // Handle form input changes
  function handleInputChange(e) {
    var inputName = e.target.name;
    var inputValue = e.target.value;
    
    var newFormData = {
      date: formData.date,
      category: formData.category,
      amount: formData.amount,
      description: formData.description
    };
    
    newFormData[inputName] = inputValue;
    setFormData(newFormData);
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!formData.date || !formData.category || !formData.amount) {
      alert('Please fill in all required fields (Date, Category, Amount)');
      return;
    }

    // Create new record
    var newRecord = {
      id: Date.now(),
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description
    };
    
    if (!newRecord.description) {
      newRecord.description = '';
    }

    // Add to records list
    var updatedRecords = [];
    for (var i = 0; i < records.length; i++) {
      updatedRecords.push(records[i]);
    }
    updatedRecords.push(newRecord);
    
    setRecords(updatedRecords);
    saveToLocalStorage(updatedRecords, customCategories);

    // Reset form
    var today = new Date();
    var todayString = today.getFullYear() + '-' + 
                      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(today.getDate()).padStart(2, '0');
    
    setFormData({
      date: todayString,
      category: '',
      amount: '',
      description: ''
    });

    alert('Spending record added successfully!');
  }

  // Handle adding new category
  function handleAddCategory() {
    // Check if category name is provided
    var categoryName = newCategory.trim();
    if (!categoryName) {
      alert('Please enter a category name');
      return;
    }

    // Create list of all existing categories
    var allCategories = [];
    for (var i = 0; i < spendingCategories.length; i++) {
      allCategories.push(spendingCategories[i].category);
    }
    for (var j = 0; j < customCategories.length; j++) {
      allCategories.push(customCategories[j]);
    }

    // Check if category already exists
    var categoryExists = false;
    for (var k = 0; k < allCategories.length; k++) {
      if (allCategories[k] === categoryName) {
        categoryExists = true;
        break;
      }
    }
    
    if (categoryExists) {
      alert('Category already exists');
      return;
    }

    // Add new category
    var updatedCategories = [];
    for (var m = 0; m < customCategories.length; m++) {
      updatedCategories.push(customCategories[m]);
    }
    updatedCategories.push(categoryName);
    
    setCustomCategories(updatedCategories);
    saveToLocalStorage(records, updatedCategories);
    
    // Select the new category in form
    var newFormData = {
      date: formData.date,
      category: categoryName,
      amount: formData.amount,
      description: formData.description
    };
    setFormData(newFormData);
    
    setNewCategory('');
    setShowAddCategory(false);
    alert('Category added successfully!');
  }

  // Handle deleting a record
  function handleDeleteRecord(id) {
    var confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      var updatedRecords = [];
      for (var i = 0; i < records.length; i++) {
        if (records[i].id !== id) {
          updatedRecords.push(records[i]);
        }
      }
      setRecords(updatedRecords);
      saveToLocalStorage(updatedRecords, customCategories);
    }
  }

  // Create combined list of all categories
  var allCategories = [];
  for (var i = 0; i < spendingCategories.length; i++) {
    allCategories.push(spendingCategories[i].category);
  }
  for (var n = 0; n < customCategories.length; n++) {
    allCategories.push(customCategories[n]);
  }

  return (
    <div className="journal">
      <div className="row mb-4">
        <div className="col-md-12">
          <h2>Spending Journal</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Add New Spending Record</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <div className="d-flex gap-2">
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {allCategories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setShowAddCategory(!showAddCategory)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {showAddCategory && (
                  <div className="mb-3">
                    <label htmlFor="newCategory" className="form-label">New Category</label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        id="newCategory"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category name"
                      />
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleAddCategory}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowAddCategory(false);
                          setNewCategory('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Optional description..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Add Record
                </button>
              </form>
            </div>
          </div>

          {customCategories.length > 0 && (
            <div className="card mt-4">
              <div className="card-header">
                <h6>Custom Categories</h6>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  {customCategories.map((category, index) => (
                    <span key={index} className="badge bg-success">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Recent Records</h5>
            </div>
            <div className="card-body">
              {records.length === 0 ? (
                <div className="text-center text-muted">
                  <p>No spending records yet.</p>
                  <p>Add your first record to get started!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        // Sort records by date (newest first)
                        var sortedRecords = [];
                        for (var i = 0; i < records.length; i++) {
                          sortedRecords.push(records[i]);
                        }
                        
                        for (var p = 0; p < sortedRecords.length - 1; p++) {
                          for (var q = 0; q < sortedRecords.length - p - 1; q++) {
                            var date1 = new Date(sortedRecords[q].date);
                            var date2 = new Date(sortedRecords[q + 1].date);
                            if (date1 < date2) {
                              var temp = sortedRecords[q];
                              sortedRecords[q] = sortedRecords[q + 1];
                              sortedRecords[q + 1] = temp;
                            }
                          }
                        }
                        
                        // Show only first 10 records
                        var displayRecords = [];
                        for (var r = 0; r < Math.min(10, sortedRecords.length); r++) {
                          displayRecords.push(sortedRecords[r]);
                        }
                        
                        return displayRecords;
                      })().map((record) => (
                          <tr key={record.id}>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>
                              <span className="badge bg-primary">
                                {record.category}
                              </span>
                            </td>
                            <td>${record.amount.toFixed(2)}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteRecord(record.id)}
                                title="Delete record"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {records.length > 0 && (
            <div className="card mt-4">
              <div className="card-header">
                <h6>Quick Stats</h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-6">
                    <h6 className="text-muted">Total Records</h6>
                    <h4 className="text-primary">{records.length}</h4>
                  </div>
                  <div className="col-6">
                    <h6 className="text-muted">Total Spent</h6>
                    <h4 className="text-success">
                      ${(() => {
                        var total = 0;
                        for (var i = 0; i < records.length; i++) {
                          total = total + records[i].amount;
                        }
                        return total.toFixed(2);
                      })()}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Journal;