

import axios from "axios";
import { base_url } from "../../utils/base_url";

// Function to create a short link
export const createShortLink = async (linkData) => {
  try {
    const response = await axios.post(`${base_url}/api/urls/create`, linkData);
    console.log(response)
    return response.data; // Assuming the API response contains the short URL
  } catch (error) {
    throw new Error("Failed to create short link"); // Error handling
  }
};

// Function to get all short URLs
export const getAllShortUrls = async () => {  // Removed unused shortLink parameter
  try {
    const response = await axios.get(`${base_url}urls`);  // Assuming the API endpoint for all short links
    return response.data; // Returning data from API response
  } catch (error) {
    throw new Error("Failed to fetch short links"); // Error handling
  }
};

// Edit a short URL
export const editShortUrl = async (id, updatedData) => {
  try {
    const response = await axios.put(`${base_url}urls/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit short URL");
  }
};




// Fetch total clicks
export const fetchTotalClicks = async () => {
  const response = await axios.get(`${base_url}urls/total-clicks`);
  return response.data;
};

// Fetch date-wise clicks
export const fetchDateWiseClicks = async () => {
  const response = await axios.get(`${base_url}urls/clicks-by-date`);
  return response.data;
};

// Fetch clicks by device type
export const fetchClickDevices = async () => {
  const response = await axios.get(`${base_url}urls/clicks-by-device`);
  return response.data;
};


// Fetch User Device (correct to return response.data)
export const fetchUserDevice = async () => {
  try {
    const response = await axios.get(`${base_url}urls/device-info`);
    return response.data; // Return the actual data from the API
  } catch (error) {
    console.error('Error fetching user device:', error);
    throw error;
  }
};

// Fetch User IP (correct to ipAddress)
export const fetchUserIp = async () => {
  try {
    const response = await axios.get(`${base_url}urls/ip-info`);
    return response.data.ipAddress; // Correct property name
  } catch (error) {
    console.error("Error fetching IP address:", error);
    throw new Error("Error fetching IP address");
  }
};




// Function to delete a short URL by its ID
export const deleteShortUrlService = async (shortURLId) => {
  try {
    const response = await axios.delete(`${API_URL}${shortURLId}`);
    return response.data; // Return the response data (success message, etc.)
  } catch (error) {
    throw error.response?.data || 'An error occurred while deleting the URL'; // Return error message
  }
};



