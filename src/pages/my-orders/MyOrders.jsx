import "./MyOrders.css";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneLayout } from "react-icons/ai";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/${user._id}`)
      .then((response) => {
        console.log("response data", response.data);

        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    user && getOrders();
  }, [user]);

  return (
    <div>
      <h1>My Orders</h1>
      <div>
        {orders &&
          orders.map((order) => (
            <div key={order._id}>
              <p>{order.amount}</p>
              <div>
                {order.items.map((item) => (
                  <div key={item._id}>
                    <p>{item.product.model}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyOrders;
