import { useCallback, useState } from "react"

import axios from "../axios"
import requests from "../requests"
import utils from "../utils";
import { login } from "../features/userSlice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export function useAuthHooks() {
  const [loading, setLoading] = useState(false)
  
  const registerUser = useCallback(async (email, password, handleClose, formData, dispatch) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (authUser) => {
      await axios.post(requests.addUser(authUser.user.uid).concat(`?emailId=${authUser.user.email}`)).then((user) => {
        dispatch(login(user.data));
        localStorage.setItem("user", JSON.stringify(user.data));
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        if (cart) {
          utils.bulkaddCart(user.data, cart, dispatch);
        }
        utils.getCart(user.data.userId, dispatch);
        formData.resetForm()
        handleClose()
      })
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      alert(error.message);
    });
  }, [loading])

  const loginUser = useCallback(async (email, password, handleClose, formData, dispatch) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (authUser) => {
      await axios.get(requests.fetchUser(authUser.user.uid)).then((user) => {
        dispatch(login(user.data));
        localStorage.setItem("user", JSON.stringify(user.data));
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        if (cart) {
          utils.bulkaddCart(user.data, cart, dispatch);
        }
        utils.getCart(user.data.userId, dispatch);
        formData.resetForm()
        handleClose()
        setLoading(false)
      })
    })
    .catch((error) => {
      alert(error.message);
      setLoading(false)
    })
  }, [loading])

  return { loading, registerUser, loginUser }
}
