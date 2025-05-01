import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../slice/invoiceSlice';
import jsPDF from 'jspdf';

const InvoicePage = () => {
  const dispatch = useDispatch();
  const { data: invoices, loading, error } = useSelector((state) => state.invoices);
  const [view, setView] = useState('table');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
