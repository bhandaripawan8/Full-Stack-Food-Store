import React, {useContext,  useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios';


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
            ...item,
            quantity: cartItems[item._id]
        }));
        let orderData = {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount()+2,
        }
        let response = await axios.post(url+'/api/order/place', orderData, {headers: {token}})
        if(response.data.success){
          const {session_url} = response.data;
          // sending the user into session_url
          window.location.replace(session_url);
        }
        else{
          alert('Error')
        }
}



  return (
    <form onSubmit={placeOrder} className='place-order'>  
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
              <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
              <input required  name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='Last Name'/>
            </div>
            <input required  name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email Address'/>
            <input required  name='street' onChange={onChangeHandler} value={data.street}  type="text" placeholder='Street'/>
            <div className="multi-fields">
              <input required  name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City'/>
              <input required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state'/>
            </div>
            <div className="multi-fields">
              <input required  name='zipCode' onChange={onChangeHandler} value={data.zipCode}  type="text" placeholder='Zip Code'/>
              <input required  name='country' onChange={onChangeHandler} value={data.country}  type="text" placeholder='Country'/>
            </div>
            <input required  name='phone' onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0? 0: 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder