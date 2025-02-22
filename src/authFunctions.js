import { auth } from "./firebase"
import { removeCart } from "./features/cartSlice";
import { signOut } from "firebase/auth";
import { logout } from "./features/userSlice";

const authFunctions = {

  logoutUser: async (dispatch) => {
    signOut(auth)
    .then(() => {
      dispatch(logout())
      dispatch(removeCart([]))
      localStorage.removeItem("user");
      console.log('userSigned out')
    })
    .catch((error) => {
      console.log(error.message)
    })
  }
}

export default authFunctions;
