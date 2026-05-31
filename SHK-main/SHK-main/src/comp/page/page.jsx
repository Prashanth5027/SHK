// src/comp/page/Page.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Auth-config"; // Firestore import
import { products } from "../../data/products";
import Grid from "../grid/ForU-grid";
import Foot from "../foot/foot";
import "./page.css";

function Page() {
  const { index } = useParams();
  const productIndex = parseInt(index, 10);

  const [loaded, setLoaded] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // New states for Firestore
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const product =
    !isNaN(productIndex) && productIndex >= 0 && productIndex < products.length
      ? products[productIndex]
      : products[0];

  // parse price to numeric amount
  const rawAmount = String(product.price || "").replace(/[₹,\s]/g, "");
  let amount = parseFloat(rawAmount);
  if (isNaN(amount) || amount <= 0) amount = 1;

  // UPI details
  const upiId = "paytmqr6ozrdm@ptys";
  const payeeName = "SRIHARIKRISHNATEXTIL";

  // Build UPI link
  const upiLink = `upi://pay?pa=${encodeURIComponent(
    upiId
  )}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(
    (amount * quantity).toString()
  )}&cu=INR`;

  // QR service
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    upiLink
  )}&size=300x300`;

  // detect mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // New function: Save order to Firestore
  const saveOrderToFirestore = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        productName: product.name,
        price: amount,
        quantity: quantity,
        totalAmount: amount * quantity,
        name: name || "Anonymous",
        address: address || "Not provided",
        date: new Date().toLocaleDateString(),
        status: "Pending",
      });
      console.log("✅ Firestore order saved, ID:", docRef.id);
      setMessage("✅ Order saved successfully!");
    } catch (error) {
      console.error("❌ Firestore write error:", error.code, error.message);
      setMessage(`❌ Error saving order: ${error.message}`);
      throw error; // stop payment if save failed
    } finally {
      setSaving(false);
    }
  };

const handleUPIPay = () => {
  if (!name || !address || !phone || quantity < 1) {
    setMessage("❌ Please fill all fields and set quantity ≥ 1.");
    return;
  }


  // ❌ Remove Firestore saving from here
  if (isMobile) {
    window.location.href = upiLink;
  } else {
    setShowQR(true);
  }
};


  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Timer logic: hide QR after 15s and show popup
  useEffect(() => {
    let timer;
    if (showQR) {
      timer = setTimeout(() => {
        setShowQR(false);
        setShowPopup(true);
      }, 15000);
    }
    return () => clearTimeout(timer);
  }, [showQR]);

const handlePopupResponse = async (response) => {
  setShowPopup(false);
  if (response === "yes") {
    try {
      setSaving(true);
      setMessage("");

      // 🔹 Save order to Firestore here
const docRef = await addDoc(collection(db, "orders"), {
  productName: product.name,
  price: amount,
  quantity: quantity,
  totalAmount: amount * quantity,
  name: name || "Anonymous",
  address: address || "Not provided",
  phone: phone || "Not provided", // ✅ added
  date: new Date().toLocaleDateString(),
  status: "Paid",
});


      console.log("✅ Firestore order saved, ID:", docRef.id);
      setMessage("✅ Payment confirmed and order saved!");
      setName("");
      setAddress("");
    } catch (error) {
      console.error("❌ Firestore write error:", error.code, error.message);
      setMessage(`❌ Error saving order: ${error.message}`);
    } finally {
      setSaving(false);
    }

    alert("✅ Thank you! Payment confirmed.");
  } else {
    alert("❌ Payment not completed. Please try again.");
  }
};


  return (
    <>
      <section className="product-page">
        <div className="product-images">
          {!loaded && <div className="skeleton" />}
          <img
            src={product.src}
            alt={product.name}
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? "block" : "none", maxWidth: "100%" }}
          />
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-description">
            This is a high quality {product.name} from Harikrishna Textiles.
          </p>

          {/* NEW: User input fields */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="text"

              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />
                        <input
              type="number"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded"
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                className="border p-2 rounded w-20"
              />
            </div>
          </div>

          {message && (
            <p style={{ marginTop: 12, color: message.startsWith("❌") ? "red" : "green" }}>
              {message}
            </p>
          )}

          {/* UPI payment button */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={handleUPIPay}
              className="btn-confirm btn-buy-now"
              disabled={saving}
            >
              {saving ? "Saving order..." : `Pay ₹${amount * quantity} with UPI`}
            </button>
          </div>

          {/* Desktop QR fallback */}
          {showQR && (
            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 18,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ marginBottom: 8, fontWeight: 600 }}>
                  Scan QR with your UPI app
                </div>
                <img
                  src={qrUrl}
                  alt="UPI QR"
                  style={{ width: 220, height: 220, borderRadius: 8 }}
                />
              </div>

              <div style={{ minWidth: 220 }}>
                <div style={{ marginBottom: 8 }}>
                  Or copy UPI ID and paste in your UPI app:
                </div>
                <div
                  style={{
                    background: "#f5f5f5",
                    padding: 10,
                    borderRadius: 6,
                    marginBottom: 8,
                    wordBreak: "break-word",
                    fontFamily: "monospace",
                  }}
                >
                  {upiId}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleCopyUPI}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 6,
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    {copied ? "Copied ✓" : "Copy UPI ID"}
                  </button>

                  <a
                    href={upiLink}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 6,
                      border: "1px solid #ddd",
                      textDecoration: "none",
                      color: "#111",
                      display: "inline-block",
                    }}
                  >
                    Open UPI (if phone supports)
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Payment confirmation popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div

                className="order-panel open"
          >
            <h3  style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                }} 
                
                >Did you complete your payment?</h3>
            <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => handlePopupResponse("yes")}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "#4caf50",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => handlePopupResponse("no")}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "#f44336",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keep the rest of your page */}
      <Grid />
      <Foot />
    </>
  );
}

export default Page;
