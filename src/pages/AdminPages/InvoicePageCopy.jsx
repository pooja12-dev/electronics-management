import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices, addInvoice } from '../../slice/invoiceSlice';
import jsPDF from 'jspdf';
import { db } from '../../firebase'; // Assuming firebase is properly set up
import { collection, addDoc } from 'firebase/firestore';

const InvoicePage = () => {
  const dispatch = useDispatch();
  const { data: invoices, loading, error } = useSelector((state) => state.invoices);
  const [view, setView] = useState('table');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    description: '',
    date: new Date(),
    status: 'Paid',
    total: 0,
    type: 'Customer Invoice', // Default type
  });
  const [errors, setErrors] = useState({
    customer: '',
    description: '',
    total: '',
  });

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    setShowModal(false);
  };

  const downloadPDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Invoice: ${invoice.customer}`, 10, 10);
    doc.text(`Description: ${invoice.description}`, 10, 20);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 10, 30);
    doc.text(`Status: ${invoice.status}`, 10, 40);
    doc.text(`Total: ₹${invoice.total}`, 10, 50);
    doc.text(`Type: ${invoice.type}`, 10, 60);
    doc.save(`Invoice_${invoice.customer}.pdf`);
  };

  const shareViaGmail = (invoice) => {
    const subject = encodeURIComponent(`Invoice Details for ${invoice.customer}`);
    const body = encodeURIComponent(`
      Here are the details of the invoice:
      - Customer: ${invoice.customer}
      - Description: ${invoice.description}
      - Date: ${new Date(invoice.date).toLocaleDateString()}
      - Status: ${invoice.status}
      - Total: ₹${invoice.total}
      - Type: ${invoice.type}
    `);

    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleAddInvoice = async () => {
    let formIsValid = true;
    let newErrors = { ...errors };

    // Validate customer name (must be a string and not empty)
    if (newInvoice.customer.trim() === '') {
      formIsValid = false;
      newErrors.customer = 'Customer name is required.';
    } else {
      newErrors.customer = '';
    }

    // Validate description (cannot be empty)
    if (newInvoice.description.trim() === '') {
      formIsValid = false;
      newErrors.description = 'Description is required.';
    } else {
      newErrors.description = '';
    }

    // Validate total (must be a positive integer)
    if (!Number.isInteger(Number(newInvoice.total)) || newInvoice.total <= 0) {
      formIsValid = false;
      newErrors.total = 'Amount must be a positive integer.';
    } else {
      newErrors.total = '';
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        // Add invoice to Firestore
        const docRef = await addDoc(collection(db, 'invoices'), {
          ...newInvoice,
          date: newInvoice.date,
        });
        dispatch(addInvoice({ ...newInvoice, id: docRef.id }));
        setShowAddInvoiceModal(false);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const renderCardView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
        >
          <h3 className="font-semibold text-lg">{invoice.customer}</h3>
          <p className="text-sm text-gray-600">{invoice.description}</p>
          <p className="text-sm text-gray-600">
            <strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> {invoice.status}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Total:</strong> ₹{invoice.total}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Type:</strong> {invoice.type}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow"
              onClick={() => downloadPDF(invoice)}
            >
              Download PDF
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded shadow"
              onClick={() => openModal(invoice)}
            >
              View
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
              onClick={() => shareViaGmail(invoice)}
            >
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="py-3 px-4 border-b">{invoice.customer}</td>
              <td className="py-3 px-4 border-b">{invoice.description}</td>
              <td className="py-3 px-4 border-b">{new Date(invoice.date).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{invoice.status}</td>
              <td className="py-3 px-4 border-b">₹{invoice.total}</td>
              <td className="py-3 px-4 border-b">{invoice.type}</td>
              <td className="py-3 px-4 border-b">
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => downloadPDF(invoice)}
                  >
                    Download PDF
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => openModal(invoice)}
                  >
                    View
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                    onClick={() => shareViaGmail(invoice)}
                  >
                    Share
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <div>
          <button
            className={`px-4 py-2 rounded-l-md border ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setView('table')}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 rounded-r-md border ${view === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setView('card')}
          >
            Card View
          </button>
          <button
            className="px-4 py-2 ml-4 bg-green-500 text-white rounded"
            onClick={() => setShowAddInvoiceModal(true)}
          >
            Add Invoice
          </button>
        </div>
      </div>
      {view === 'table' ? renderTableView() : renderCardView()}
      {showModal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
            <p><strong>Customer:</strong> {selectedInvoice.customer}</p>
            <p><strong>Description:</strong> {selectedInvoice.description}</p>
            <p><strong>Date:</strong> {new Date(selectedInvoice.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedInvoice.status}</p>
            <p><strong>Total:</strong> ₹{selectedInvoice.total}</p>
            <p><strong>Type:</strong> {selectedInvoice.type}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => downloadPDF(selectedInvoice)}
              >
                Download PDF
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={() => shareViaGmail(selectedInvoice)}
              >
                Share
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Add New Invoice</h2>
            <div>
              <label className="block">Customer</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newInvoice.customer}
                onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
              />
              {errors.customer && <p className="text-red-500 text-sm">{errors.customer}</p>}
              <label className="block">Description</label>
              <textarea
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <label className="block">Date</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newInvoice.date}
                onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
              />
              <label className="block">Status</label>
              <select
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newInvoice.status}
                onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              <label className="block">Amount</label>
              <input
                type="number"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newInvoice.total}
                onChange={(e) => setNewInvoice({ ...newInvoice, total: e.target.value })}
              />
              {errors.total && <p className="text-red-500 text-sm">{errors.total}</p>}
              <label className="block">Invoice Type</label>
              <select
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newInvoice.type}
                onChange={(e) => setNewInvoice({ ...newInvoice, type: e.target.value })}
              >
                <option value="Customer Invoice">Customer Invoice</option>
                <option value="Vendor Invoice">Vendor Invoice</option>
              </select>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAddInvoice}
                >
                  Add Invoice
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowAddInvoiceModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
