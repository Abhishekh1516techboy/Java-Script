async function payNow() {
  const response = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const order = await response.json();

  const options = {
    key: "rzp_test_uCNmAB0rDFpj1V",
    amount: order.amount,
    currency: "INR",
    name: "Bag Store",
    order_id: order.id,
    handler: async function (response) {
      // Send response to verify on backend
      await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
