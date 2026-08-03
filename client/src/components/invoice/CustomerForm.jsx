const CustomerForm = ({ invoice, setInvoice }) => {
  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">
        Customer Details
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={invoice.customerName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="customerMobile"
          placeholder="Customer Mobile"
          value={invoice.customerMobile}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>
    </div>
  );
};

export default CustomerForm;