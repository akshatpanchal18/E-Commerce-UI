import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const URL = "https://e-commerce-server-b1yi.onrender.com/api/v1";
  const [success, setSuccess] = useState(false);
  const [Error, setError] = useState(false);
  const [Authenticated, setAuthenticated] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await fetch(`${URL}/user/refresh-token`, {
        method: "POST",
        credentials: "include", // Send cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        // Log the exact status code and response for debugging
        const errorText = await res.text();
        console.error(`Failed to refresh token: ${res.status} - ${errorText}`);
        return false;
      }
      const result = await res.json();
      console.log("Token refreshed successfully:", result);
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };
  const login = async (user) => {
    console.log("from authContext", user);
    try {
      const res = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setAuthenticated(true);
        // console.log(result);
        localStorage.setItem("isLoggedIn", true);
        return { success: true, data: result };
      }
    } catch (error) {
      setError(error);
      return {
        success: false,
        error: error.message || "An error occurred during login.",
      };
    }
  };

  const Currentuser = async () => {
    const res = await fetch(`${URL}/user/get-current-user`, {
      method: "GET",
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
    if (result.statusCode === 200) {
      return { success: true, data: result.data };
    }
  };

  const logout = async () => {
    const res = await fetch(`${URL}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      credentials: "include",
    });
    const result = await res.json();
    if (res.ok) {
      localStorage.clear();
      console.log(result);
      return { success: true, data: result };
    }
  };
  const register = async (data) => {
    console.log("from authContext", data);
    try {
      const res = await fetch(`${URL}/user/register-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        //  setSuccess(true)
        //  setAuthenticated(true)
        console.log(result);
        //  localStorage.setItem("isLoggedIn",true)
        //  localStorage.setItem("userData",JSON.stringify(result.data))
        return { success: true, data: result };
      }
    } catch (error) {
      setError(error);
      return {
        success: false,
        error: error.message || "An error occurred during registration.",
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        URL,
        register,
        success,
        Error,
        Authenticated,
        refreshToken,
        Currentuser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
