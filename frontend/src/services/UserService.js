import { handleRequest } from "./handleRequest";
import authAxios from "./authAxios";

class UserService {
  static fetchUserById = (userId) => {
    const { data, error } = handleRequest(() =>
      authAxios.get(`/users/${userId}`)
    );
    if (error) {
      console.error(error);
    }
    return data;
  };
}

export default UserService;
