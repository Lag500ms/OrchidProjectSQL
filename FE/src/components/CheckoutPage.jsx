import { useCart } from "./CartContext";
import { jwtDecode } from "jwt-decode";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place an order.");
        return;
      }

      const decoded = jwtDecode(token);
      const username = decoded.sub || decoded.username; 

      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username, 
          items: cartItems.map(i => ({
            orchidId: i.id,
            quantity: i.quantity
          }))
        })
      });

      if (res.ok) {
        clearCart();
        alert("Order placed!");
      } else {
        const text = await res.text();
        alert("Failed to place order: " + text);
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <ul className="mb-4">
        {cartItems.map((i) => (
          <li key={i.id}>{i.name} x {i.quantity}</li>
        ))}
      </ul>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleSubmit}
      >
        Confirm Order
      </button>
    </div>
  );
}
