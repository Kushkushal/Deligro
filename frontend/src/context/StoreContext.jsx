import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({}); // Initialize as an empty object
    const url = "https://deligro.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems) {
            console.error("cartItems is undefined or null");
            return;
        }

        // Safely update the cart items
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        }));

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] - 1 : 0,
        }));

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            const cartData = response.data.cartData;
            setCartItems(cartData ? cartData : {}); // Ensure cartItems is always an object
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({}); // Default to an empty object if there's an error
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems: cartItems || {}, // Ensure cartItems is always an object
        setCartItems,
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
