import "./MyOrders.css";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AiTwotoneLayout } from "react-icons/ai";
import dayjs from 'dayjs';
const REACT_APP_API_URL="http://localhost:5005"
const REACT_APP_API_URL2="https://vellox.cyclic.app"

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get(`${REACT_APP_API_URL}/api/orders/${user._id}`)
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
      <div className="orders-container">
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div>
                <p>Total amount: {order.amount} €</p>
                <p>Ordered on: {
                    dayjs(`${order.createdAt}`).format('DD MMM YYYY')
                  } </p>
                <p><b>Status:</b> {order.isPaid ? "payment confirmed" : "payment not confirmed"} </p>
              </div>
              <div>
                <h5>Products:</h5>
                <div className="order-product">
                  {order.items.map((item) => (
                    <div >
                      <img className="order-product-img" src={item.product.images[0]} alt="order product" />
                      <div key={item._id}>
                        <p>{item.product.model}</p>
                        <p>{item.product.price} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyOrders;
