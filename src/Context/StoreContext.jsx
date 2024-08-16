import { createContext, useEffect, useState } from "react";
import axios from 'axios'; // Import axios

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItem] = useState({});
  const url = 'http://localhost:4000';
  const [token, setToken] = useState('');

  const addToCart = (itemId) => {
    setCartItem(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItem(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
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

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
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
