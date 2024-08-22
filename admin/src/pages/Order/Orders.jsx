import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/admin_assets/assets';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    try {
      const response = await axios.post(url + '/api/order/status', {
        id:orderId,
        status,
      });
      if (response.data.success) {
        setOrders(orders => orders.map(order =>
          order._id === orderId ? { ...order, status } : order
        ));
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel icon" />
            <div>
              <p className='order-description'>
                {order.items && order.items.map((item, itemIndex) => {
                  return itemIndex === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>
              {order.address && (
                <>
                  <p className="order-item-name">
                    {order.address.firstName + ' ' + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street + ','}</p>
                    <p>{order.address.city + ' , ' + order.address.state + ' , ' + order.address.country + ' , ' + order.address.zipCode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </>
              )}
            </div>
            <p>Items: {order.items.length}</p>
            <p>GBP: {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
