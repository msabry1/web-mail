import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class UserService {
  static fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  };
}

export default UserService;