import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItem] = useState({});
  const url = 'http://localhost:4000';
  const [token, setToken] = useState('');

  const addToCart = async(itemId) => {
    setCartItem(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    if(token){
      await axios.post(url+'/api/cart/add', {itemId}, {headers: {token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
    if(token){
      await axios.post(url+'/api/cart/remove', {itemId}, {headers: {token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(product => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + '/api/food/list');
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const loadCartData = async (token) =>{
    const response = await axios.get(url+'/api/cart/get',  {headers: {token}})
    setCartItem(response.data.cartData);
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(localStorage.getItem('token'));
        // console.log(localStorage.getItem('token'))
      }
    };
    loadData();
  }, [url]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
