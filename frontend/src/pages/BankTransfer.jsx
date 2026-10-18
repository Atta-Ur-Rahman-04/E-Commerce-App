import { Link, useLocation } from "react-router-dom";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const BankTransfer = () => {
  const { state } = useLocation();
  const { currency, delivery_fee } = useContext(ShopContext);

  if (!state) {
    return (
      <div className="pt-16 text-center">
        No order found.{" "}
        <Link to="/orders" className="underline">
          View my orders
        </Link>
      </div>
    );
  }

  const { orderId, bankDetails, amount, amountPkr, items } = state;

  return (
    <div className="border-t pt-16 max-w-xl mx-auto">
      <div className="text-2xl mb-6">
        <Title text1={"BANK"} text2={"TRANSFER"} />
      </div>
      <p className="text-gray-600 mb-4">
        Your order is placed. Transfer the total amount to the account below and
        use your order ID as the payment reference.
      </p>

      <div className="border p-5 mb-4 flex flex-col gap-3 text-sm">
        <p className="font-medium">Your items</p>
        {items?.map((item, index) => (
          <div key={index} className="flex gap-3 border-t pt-3">
            <img src={item.image?.[0]} className="w-14" alt="" />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-xs">
                {item.description?.length > 80
                  ? item.description.slice(0, 80) + "..."
                  : item.description}
              </p>
              <p className="text-xs mt-1">
                Qty: {item.quantity} | Size: {item.size} | {currency}
                {item.price}
              </p>
            </div>
          </div>
        ))}
        <p className="text-xs border-t pt-3">
          Shipping: {currency}
          {delivery_fee}
        </p>
      </div>

      <div className="border p-5 flex flex-col gap-2 text-sm">
        <p>
          Bank: <b>{bankDetails.bankName}</b>
        </p>
        <p>
          Order total:{" "}
          <b>
            {currency}
            {amount}
          </b>
        </p>
        <p>
          Amount to transfer: <b>Rs. {amountPkr?.toLocaleString()}</b>
        </p>
        <p>
          Account title: <b>{bankDetails.accountTitle}</b>
        </p>
        <p>
          Account number: <b>{bankDetails.accountNumber}</b>
        </p>
        <p>
          IBAN: <b>{bankDetails.iban}</b>
        </p>
        <p>
          Reference (order ID): <b>{orderId}</b>
        </p>
      </div>
      <Link
        to="/orders"
        className="inline-block bg-black text-white text-sm px-8 py-3 mt-6"
      >
        VIEW MY ORDERS
      </Link>
    </div>
  );
};

export default BankTransfer;
