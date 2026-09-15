import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(initialProducts);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const getProductsData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/product/list`);
      const data = await response.json();
      if (data.success && data.products && data.products.length > 0) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch backend products, using default catalog:", error);
    }
  };

  const getUserCart = async (authToken) => {
    try {
      const response = await fetch(`${backendUrl}/api/cart/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': authToken
        }
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartData || {});
      }
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select product size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success('Added to Cart');

    if (token) {
      try {
        await fetch(`${backendUrl}/api/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify({ itemId, size })
        });
      } catch (error) {
        console.error("Cart sync error:", error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await fetch(`${backendUrl}/api/cart/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify({ itemId, size, quantity })
        });
      } catch (error) {
        console.error("Update quantity sync error:", error);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalAmount;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    toast.info('Logged out');
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setCartItems,
    backendUrl,
    token,
    setToken,
    getUserCart,
    getProductsData,
    logout
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;