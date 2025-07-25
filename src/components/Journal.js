import { useState, useEffect } from 'react';
import spendingCategories from '../spending_data.json';

function Journal() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    description: ''
  });
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem('spendingRecords') || '[]');
    const savedCategories = JSON.parse(localStorage.getItem('customCategories') || '[]');
    setRecords(savedRecords);
    setCustomCategories(savedCategories);
  }, []);

  const saveToLocalStorage = (records, categories) => {
    localStorage.setItem('spendingRecords', JSON.stringify(records));
    localStorage.setItem('customCategories', JSON.stringify(categories));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.category || !formData.amount) {
      alert('Please fill in all required fields (Date, Category, Amount)');
      return;
    }

    const newRecord = {
      id: Date.now(),
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description || ''
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    saveToLocalStorage(updatedRecords, customCategories);

    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      amount: '',
      description: ''
    });

    alert('Spending record added successfully!');
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name');
      return;
    }

    const allCategories = [
      ...spendingCategories.map(cat => cat.category),
      ...customCategories
    ];

    if (allCategories.includes(newCategory)) {
      alert('Category already exists');
      return;
    }

    const updatedCategories = [...customCategories, newCategory];
    setCustomCategories(updatedCategories);
    saveToLocalStorage(records, updatedCategories);
    
    setFormData(prev => ({ ...prev, category: newCategory }));
    setNewCategory('');
    setShowAddCategory(false);
    alert('Category added successfully!');
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
      saveToLocalStorage(updatedRecords, customCategories);
    }
  };

  const allCategories = [
    ...spendingCategories.map(cat => cat.category),
    ...customCategories
  ];

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
                      {records
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 10)
                        .map((record) => (
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
                      ${records.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
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