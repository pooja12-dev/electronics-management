import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoices = () => {
  console.log("Invoices component rendered");
  const [invoices, setInvoices] = useState([
    {
      ref: "INV-1001",
      date: "2025-04-22",
      type: "Customer Invoice",
      customer: "Acme Corp",
      description: "Website Development",
      total: "₹12,000",
      status: "Unpaid",
    },
    {
      ref: "INV-1002",
      date: "2025-04-20",
      type: "Vendor Invoice",
      customer: "Beta Ltd.",
      description: "Purchase Equipment",
      total: "₹5,600",
      status: "Part Paid",
    },
  ]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [showSharePortal, setShowSharePortal] = useState(false);
  const [showViewPortal, setShowViewPortal] = useState(false); // Control the visibility of the view modal
  const invoiceRefs = useRef([]); // An array of refs for each invoice

  const handleDownloadPDF = (invoiceIndex) => {
    const invoiceElement = invoiceRefs.current[invoiceIndex]; // Use the specific invoice ref

    html2canvas(invoiceElement, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${invoices[invoiceIndex].ref}_invoice.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

  const handleShare = (invoice) => {
    setSelectedInvoice(invoice); // Set selected invoice before showing the modal
    console.log("Selected Invoice for View:", invoice);
    setShowSharePortal(true);
  };

  const handleCopyLink = () => {
    const invoiceLink = `https://example.com/invoice/${selectedInvoice.ref}`;
    navigator.clipboard.writeText(invoiceLink);
    alert("Link copied to clipboard!");
  };

  const handleAddInvoice = (event) => {
    event.preventDefault();
    const newInvoice = {
      ref: `INV-${Date.now()}`,
      date: event.target.date.value,
      type: event.target.type.value,
      customer: event.target.customer.value,
      description: event.target.description.value,
      total: event.target.total.value,
      status: event.target.status.value,
    };
    setInvoices([...invoices, newInvoice]);
    setShowForm(false);
  };

  const filterInvoices = () => {
    const now = new Date();
    return invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.date);
      if (filter === "last7days") {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        return invoiceDate >= sevenDaysAgo && invoiceDate <= now;
      } else if (filter === "month") {
        return (
          invoiceDate.getMonth() === now.getMonth() &&
          invoiceDate.getFullYear() === now.getFullYear()
        );
      } else {
        return true;
      }
    });
  };

  const filteredInvoices = filterInvoices();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full flex items-center gap-4 px-4 py-4 shadow bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Invoice
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-auto px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="last7days">Last 7 Days</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Invoice Count */}
      <div className="w-full px-4 py-2 text-gray-700">
        Showing {filteredInvoices.length} of {invoices.length} invoices
      </div>

      {/* Invoice List */}
      <div className="flex-1 flex flex-col items-center py-4 px-2">
        {filteredInvoices.map((invoice, index) => (
          <div
            key={invoice.ref}
            className="w-full max-w-md bg-white shadow-md rounded-lg mb-4 p-4"
            ref={(el) => (invoiceRefs.current[index] = el)} // Set ref for each invoice element
          >
            <div>
              <h2 className="text-lg font-bold mb-2">{invoice.ref}</h2>
              <p>
                <b>Date:</b> {invoice.date}
              </p>
              <p>
                <b>Type:</b> {invoice.type}
              </p>
              <p>
                <b>Customer:</b> {invoice.customer}
              </p>
              <p>
                <b>Description:</b> {invoice.description}
              </p>
              <p>
                <b>Total:</b> {invoice.total}
              </p>
              <p>
                <b>Status:</b> {invoice.status}
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setSelectedInvoice(invoice); // Set selected invoice
                  setShowViewPortal(true); // Show view modal
                  console.log("View clicked");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>

              <button
                onClick={() => handleShare(invoice)} // Pass the invoice to handleShare
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Share
              </button>
              <button
                onClick={() => handleDownloadPDF(index)} // Pass the invoice index to download PDF
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Invoice */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-lg font-bold mb-4">Add New Invoice</h2>
            <form onSubmit={handleAddInvoice}>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="type">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="customer">
                  Customer
                </label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="total">
                  Total
                </label>
                <input
                  type="text"
                  id="total"
                  name="total"
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Part Paid">Part Paid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Invoice
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Sharing Invoice */}
      {showSharePortal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Share Invoice</h2>
            <p>Copy the link below to share the invoice:</p>
            <input
              type="text"
              readOnly
              value={`https://example.com/invoice/${selectedInvoice.ref}`}
              className="w-full px-4 py-2 border rounded mt-2"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setShowSharePortal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Invoice */}
      {showViewPortal && selectedInvoice && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-lg font-bold mb-4">{selectedInvoice.ref}</h2>
            <p>
              <b>Date:</b> {selectedInvoice.date}
            </p>
            <p>
              <b>Type:</b> {selectedInvoice.type}
            </p>
            <p>
              <b>Customer:</b> {selectedInvoice.customer}
            </p>
            <p>
              <b>Description:</b> {selectedInvoice.description}
            </p>
            <p>
              <b>Total:</b> {selectedInvoice.total}
            </p>
            <p>
              <b>Status:</b> {selectedInvoice.status}
            </p>
            <button
              onClick={() => {
                setSelectedInvoice(null); // Reset selected invoice
                setShowViewPortal(false); // Close view modal
                console.log("View modal closed");
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
