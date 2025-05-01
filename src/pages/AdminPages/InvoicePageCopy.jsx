import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../slice/invoiceSlice';
import jsPDF from 'jspdf';

const InvoicePage = () => {
  const dispatch = useDispatch();
  const { data: invoices, loading, error } = useSelector((state) => state.invoices);
  const [view, setView] = useState('table'); // State to toggle views
  const [selectedInvoice, setSelectedInvoice] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false); // Modal visibility state

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

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  if (error) {
    return <p>Error loading invoices: {error}</p>;
  }

  const renderTableView = () => (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2">Customer</th>
          <th className="border border-gray-200 px-4 py-2">Description</th>
          <th className="border border-gray-200 px-4 py-2">Date</th>
          <th className="border border-gray-200 px-4 py-2">Status</th>
          <th className="border border-gray-200 px-4 py-2">Total</th>
          <th className="border border-gray-200 px-4 py-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td className="border border-gray-200 px-4 py-2">{invoice.customer}</td>
            <td className="border border-gray-200 px-4 py-2">{invoice.description}</td>
            <td className="border border-gray-200 px-4 py-2">
              {new Date(invoice.date).toLocaleDateString()}
            </td>
            <td className="border border-gray-200 px-4 py-2">{invoice.status}</td>
            <td className="border border-gray-200 px-4 py-2">{invoice.total}</td>
            <td className="border border-gray-200 px-4 py-2">{invoice.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <div>
          <button
            className={`px-4 py-2 rounded-l-md border ${
              view === 'table'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setView('table')}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 rounded-r-md border ${
              view === 'card'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setView('card')}
          >
            Card View
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
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
