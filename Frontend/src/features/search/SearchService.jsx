import axios from 'axios';

export const searchByRemarks = async (remarks) => {
  try {
    const response = await axios.get(`/api/urls/search?remarks=${remarks}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};