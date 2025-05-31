import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/auth/isAuthenticated",
      {
        withCredentials: true,
      }
    );
    return response.data.user; // or return true
  } catch (err) {
    return false;
  }
};
