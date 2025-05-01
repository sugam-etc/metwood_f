import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function PurchasePopup({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    location: "",
  });
  const [receiptFile, setReceiptFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
  };

  const uploadToCloudinary = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_receipts");

    return fetch("https://api.cloudinary.com/v1_1/dnyhdbqhs/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          return data.secure_url;
        } else {
          throw new Error(data.error?.message || "Upload failed");
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiptFile) {
      alert("Please upload a payment receipt.");
      return;
    }

    setIsSending(true);

    try {
      const receiptUrl = await uploadToCloudinary(receiptFile);

      const templateParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        contact_number: formData.contact,
        customer_location: formData.location,
        product_name: product.name,
        product_price: `₹${product.price}`,
        payment_receipt_url: receiptUrl,
      };

      await emailjs.send(
        "service_sqnripo",
        "template_n3wdm6d",
        templateParams,
        "bOq_96EkRPU7ICWts"
      );

      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong: " + error.message);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Purchase Confirmation
        </h2>

        {sent ? (
          <div className="text-center text-green-600 text-lg font-medium">
            ✅ Purchase confirmed! Email sent.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.contact}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location (City, State)"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
                value={formData.location}
                onChange={handleChange}
              />
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col justify-between items-center border-l border-gray-200 pl-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Pay Here
                </p>
                <img
                  src="/images/payment-qr.png"
                  alt="QR Code"
                  className="w-60 h-60 object-contain border rounded-lg shadow"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="mt-6 px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Confirm Purchase"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
