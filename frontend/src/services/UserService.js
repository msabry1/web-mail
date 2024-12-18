import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Fetch user data by ID.
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - The user data.
 */
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log("Fetched user data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};
