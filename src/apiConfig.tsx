// src/apiConfig.ts
const BASE_URL = "http://192.168.1.7:3000"; // Replace with your backend base URL

export const API = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/signup`,
  // Add more endpoints as needed
  UPLOAD_DOC: `http://192.168.1.7:3001/upload-doc`,
};
