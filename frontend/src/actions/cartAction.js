import axios from "axios";
import { ADD_TO_CART, SAVE_SHIPPING_INFO, REMOVE_CART_ITEM } from "../constants/cartContant";





export const addItemsToCart = (id, quantity, navigate) => async (dispatch, getState) => {
  try {
    console.log("Addd items to acart ");
    const { data } = await axios.get(`/api/v1/product/${id}`);
    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
      },
    });

    //code to add in existing local storage array

       localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    // if (localStorage.getItem("cart") == null) {
    //   localStorage.setItem(
    //     "cart",
    //     JSON.stringify(getState().cart.cartItems)
    //   );
    // }
    // else {
     
    //   localStorage.setItem(
    //     "testObject",
    //     JSON.stringify(getState().cart.cartItems)
    //   );
    //    var existingEntries=[] ;
    //   existingEntries.push(getState().cart.cartItems);
    //   localStorage.setItem("cart", JSON.stringify(existingEntries));
    // }
    //  else{
    //   localStorage.setItem(
    //   "cart",
    //   JSON.stringify(getState().cart.cartItems)
    // );
    //  }
    // navigate("/Cart");
  } catch (error) {
    console.log(error.message);
  }
};

// Remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
}