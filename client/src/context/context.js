import React, { useReducer, createContext } from "react";

const AuthContext = createContext();

const localStorageUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: localStorageUserInfo,
  success: false,
};

const reducer = (state, action) => {
  if (action.type === "LOGIN_SUCCESS") {
    return {
      ...state,
      userInfo: action.payload,
      success: true,
    };
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (details) => {
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email: details.email,
          password: details.password,
        }),
      });
      const data = await response.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

export default AuthProvider;
