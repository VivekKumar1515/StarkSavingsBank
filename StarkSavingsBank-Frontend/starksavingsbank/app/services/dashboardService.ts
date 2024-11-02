// services/dashboardService.ts
import axios from 'axios';
import { AppConstants } from '../constants/app.constants'; // Adjust the import path based on your folder structure
import { Contact } from '../model/contact.model'; // Adjust the import path based on your folder structure

const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL; // Assuming the root URL is defined in .env.local as NEXT_PUBLIC_ROOT_URL
const jwtToken = sessionStorage.getItem("Authorization");
const xsrf = sessionStorage.getItem("XSRF-TOKEN")

export const DashboardService = {
  getAccountDetails: async (id: number) => {
    const response = await axios.get(`${baseUrl}${AppConstants.ACCOUNT_API_URL}`, {
      params: { id },
      withCredentials: true,
      headers: {
        "Authorization" : jwtToken
      }
    });
    return response;
  },

  getAccountTransactions: async (id: number) => {
    const response = await axios.get(`${baseUrl}${AppConstants.BALANCE_API_URL}`, {
      params: { id },
      withCredentials: true,
      headers: {
        "Authorization" : jwtToken
      }
    });
    return response;
  },

  getLoansDetails: async (id: number) => {
    const response = await axios.get(`${baseUrl}${AppConstants.LOANS_API_URL}`, {
      params: { id },
      withCredentials: true,
      headers: {
        "Authorization" : jwtToken
      }
    });
    return response;
  },

  getCardsDetails: async (id: number) => {
    const response = await axios.get(`${baseUrl}${AppConstants.CARDS_API_URL}`, {
      params: { id },
      withCredentials: true,
      headers: {
        "Authorization" : jwtToken
      }
    });
    return response;
  },

  getNoticeDetails: async () => {
    const response = await axios.get(`${baseUrl}${AppConstants.NOTICES_API_URL}`, {
      withCredentials: true,
    });
    return response;
  },

  saveMessage: async (contact: Contact) => {
    const response = await axios.post(`${baseUrl}${AppConstants.CONTACT_API_URL}`, contact, {
      withCredentials: true,
      headers: {
        "X-XSRF-TOKEN" : xsrf
      }
    });
    return response;
  },
};
