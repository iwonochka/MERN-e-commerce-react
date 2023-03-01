import "./MyOrders.css";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import dayjs from 'dayjs';
// const REACT_APP_API_URL="http://localhost:5005"
const REACT_APP_API_URL="https://vellox.cyclic.app"

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
    <div className="main-container">
      <section className="secondary-header">
        <h3>My Orders</h3>
      </section>
      <div className="orders-container">

          {orders &&
            orders.map((order) => (
              <div key={order._id} className="order-card" sm={12} md={6} lg={6}>


                  <div className="order-products">
                    {order.items.map((item) => (
                      <div className="order-products-item">
                        <img className="order-product-img" src={item.product.images[0]} alt="order product" />
                        <div key={item._id}>
                          <p>{item.product.model}</p>
                          <p>{item.product.price} €</p>
                        </div>
                      </div>
                    ))}
                  </div>

                <div className="order-products-details">
                  <div>
                    <div className="order-products-details-top">
                      <p className="order-details-tag"><BsCheckCircleFill className="order-details-icon" style={{color: "#5bb141"}}/>ordered</p>
                      <p>{dayjs(`${order.createdAt}`).format('DD MMM YYYY')}</p>
                    </div>
                    <div className="order-products-details-top">
                      <p className="order-details-tag"><BsFillXCircleFill className="order-details-icon" style={{color: "#ffd154"}}/>payment status</p>
                      {order.isPaid ? "confirmed" : "not confirmed"}
                    </div>
                  </div>
                  <p id="order-total">Total: <b>{order.amount} €</b></p>
                </div>
              </div>
            ))}

      </div>
    </div>
  );
};

export default MyOrders;
