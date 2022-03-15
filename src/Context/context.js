import axios from 'axios';
import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from 'react';
import { auth } from '../Authentication/firebase-config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [allData, setAllData] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uniqueItem, setUniqueItem] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState();
  const [info, setInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    address: '',
  });

  //mobile navigation sidebar
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // product search implementation
  const handleSearch = (data, searchTerm) => {
    return data.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  // fetch products
  const getProductData = () => {
    return axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAllData(data);
      })
      .catch((error) => {
        setError(true);
      });
  };

  // => localStorage implementation
  const handleLocalStorage = () => {
    let list = localStorage.getItem('cart');
    if (list) {
      return JSON.parse(localStorage.getItem('cart'));
    } else {
      return [];
    }
  };

  const handleFormLocalStorage = () => {
    const checkoutInfo = localStorage.getItem('formValues');
    if (checkoutInfo) {
      return JSON.parse(localStorage.getItem('formValues'));
    } else {
      return info;
    }
  };

  // cart logic implementation
  const initialState = {
    myCart: handleLocalStorage(),
    quantity: 0,
    total: 0,
  };

  // add to cart
  const AddToCart = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: id });
  };
  //   increase item
  const handleIncreaseItem = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };
  //   decrease item
  const handleDecreaseItem = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };
  //   delete item
  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  // reducer function
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const itemExist = allData.find((item) => item.id === action.payload);
        itemExist.quantity = 1;
        return {
          ...state,
          myCart: [...state.myCart, itemExist],
        };
        break;

      case 'INCREASE':
        const increaseCartItems = state.myCart.map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return { ...state, myCart: increaseCartItems };
        break;

      case 'DECREASE':
        const decreaseCartItems = state.myCart
          .map((cartItem) => {
            if (cartItem.id === action.payload) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          })
          .filter((cartItem) => cartItem.quantity !== 0);
        return { ...state, myCart: decreaseCartItems };
        break;

      case 'REMOVE':
        const removeItems = state.myCart.filter(
          (cartItem) => cartItem.id !== action.payload
        );
        return { ...state, myCart: removeItems };
        break;

      case 'GET_TOTAL':
        let { total, amount } = state.myCart.reduce(
          (cartTotal, cartItem) => {
            const { price, quantity } = cartItem;
            const itemTotal = price * quantity;
            cartTotal.total += itemTotal;
            return cartTotal;
          },
          {
            total: 0,
            amount: 0,
          }
        );
        total = parseFloat(total.toFixed(2));
        return { ...state, total, amount };
        break;

      default:
        break;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // display only the unique item in the cart
  var resArr = [];
  state.myCart.filter(function (item) {
    var i = resArr.findIndex((x) => x.id === item.id && x.title === item.title);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });

  // FIREBASE AUTH IMPLEMENTATION

  // => signup
  const handleSignup = async (email, password) => {
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error;
    }
  };

  // => signin
  const handleSignin = async (email, password) => {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error;
    }
  };

  // => signout
  const handleSignout = async () => {
    return signOut(auth);
  };
  // --- END OF FIREBASE AUTH IMPLEMENTATION

  useEffect(() => {
    getProductData();
    setUniqueItem(resArr);
    dispatch({ type: 'GET_TOTAL' });
    localStorage.setItem('cart', JSON.stringify(state.myCart));
  }, [state.myCart]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // const userDocRef = db.collection('users').doc(user.uid);
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const value = {
    isSidebarOpen,
    handleOpenSidebar,
    handleCloseSidebar,
    handleSearch,

    ...state,
    AddToCart,
    handleIncreaseItem,
    handleDecreaseItem,
    handleRemoveItem,
    uniqueItem,

    handleSignup,
    handleSignin,
    handleSignout,
    currentUser,

    error,
    info,
    setInfo,
    handleFormLocalStorage,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
