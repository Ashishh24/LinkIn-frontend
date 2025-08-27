import axios from "axios";
import Header from "./Header";
import { Lock, MessageCircle, User } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/url.js";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const upgradeToPremium = async () => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        {},
        {
          withCredentials: true,
        }
      );

      const { keyId, amount, currency, orderId, notes } = order.data;
      console.log(order);
      console.log(notes);

      console.log(notes.firstName, notes.lastName, notes.email);

      const options = {
        key: keyId,
        amount,
        currency,
        name: "LinkInn",
        description: "Upgrade to Premium",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

      // toast.success("Upgraded to premium successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-[90vh] bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md text-center">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-indigo-500" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Upgrade to Premium</h2>
          <p className="text-gray-600 mb-6">
            To <span className="font-medium">view profiles</span> and{" "}
            <span className="font-medium">chat with people</span> who are not
            your connections, you need a Premium plan.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 border rounded-xl">
              <User className="w-6 h-6 text-indigo-500 mb-2" />
              <p className="text-sm font-medium">View Profiles</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-xl">
              <MessageCircle className="w-6 h-6 text-indigo-500 mb-2" />
              <p className="text-sm font-medium">Chat Freely</p>
            </div>
          </div>

          <button
            onClick={upgradeToPremium}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition cursor-pointer">
            Upgrade Now
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Premium unlocks advanced features and better networking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
