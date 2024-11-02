import axios from "axios";
import { AppConstants } from "../constants/app.constants";


// Function to create an Axios instance with Basic Authentication
const createAxiosInstance = (username: string, password: string) => {
  // Encode username and password to Base64
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

  // Create an Axios instance
  const instance = axios.create({
    headers: {
      'Authorization': `Basic ${token}`, // Set the Authorization header
    },
    withCredentials: true
  });

  return instance;
};

export default async function validateLoginDetails(user: { email: string; password: string; }) {
    sessionStorage.setItem("userdetails", JSON.stringify(user));

    return createAxiosInstance(user.email, user.password).get(AppConstants.ROOT_URL+AppConstants.LOGIN_API_URL);
}