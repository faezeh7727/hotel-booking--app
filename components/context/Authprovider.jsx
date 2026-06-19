/** @format */
//اهراز هویت کانتکست
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const User = {
  name: "faeze",
  password: "334",
  email: "faeze@gamil.com",
};

const initialState = {
  user: null,
  isAthenticated: false,
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAthenticated: false,
      };
    default:
      throw new Error("unknown action");
  }
}

export default function Authproivider({ children }) {
  const [{ user, isAthenticated }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  //actions login logout

  function login(email, password) {
    if (email === User.email && password === User.password) {
      dispatch({ type: "login", payload: User });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return <AuthContext.Provider value={{
    login,
    logout,
    user,
    isAthenticated
  }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}