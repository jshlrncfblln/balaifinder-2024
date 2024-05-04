import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { backendurl } from "../../backend-connector";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false); // Loading state for authentication actions

  const login = async (inputs) => {
    try {
      setLoading(true); // Start loading during login request
      const res = await axios.post(`${backendurl}/api/auth/login`, inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error (e.g., display error message)
    } finally {
      setLoading(false); // Stop loading after login request completes
    }
  };

  const realtorLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${backendurl}/api/relauth/rellogin`, { email, password }, { withCredentials: true });
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return { success: true };
    } catch (error) {
      console.error("Realtor Login error:", error);
      return { success: false, error: error.res.data.message || "An error occurred. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true); // Start loading during logout request
      //await axios.post(`${backendurl}/api/auth/logout`, null, {
        //withCredentials: true,
      //});
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error (e.g., display error message)
    } finally {
      setLoading(false); // Stop loading after logout request completes
    }
  };

  const rellogout = async () => {
    try {
      setLoading(true); // Start loading during logout request
      await axios.post(`${backendurl}/api/relauth/rellogout`, null, {
        withCredentials: true,
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle logout error (e.g., display error message)
    } finally {
      setLoading(false); // Stop loading after logout request completes
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, realtorLogin, logout, rellogout, loading }}> {/* Include logout in the context value */}
      {children}
    </AuthContext.Provider>
  );
};
