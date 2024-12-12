// src/apiConfig.ts
const BASE_URL = "http://192.168.16.112:3003"; // Replace with your backend base URL
const BASE_URL2 = "http://192.168.16.112:6000";

export const API = {
  LOGIN: `${BASE_URL}/api/login`,
  REGISTER: `${BASE_URL}/api/signup`,
  // Add more endpoints as needed
  UPLOAD_DOC: `http://192.168.16.112:3001/upload-doc`,
  SAVE_EXTRACTED_DATA: `${BASE_URL2}/saveData`, //to store the final document on reviewand Submit stage
  GET_SAVED_DATA: `${BASE_URL2}/getSavedData`, //to get the saved Doc, done on the above step
  GET_DAILY_MEDICINE_STATUS: `${BASE_URL2}/api/dailyMedicineStatus`,
  STORE_DAILY_MEDICINE: `${BASE_URL2}/api/storeDailyMedicine`,
  STORE_SYMPTOMS: `${BASE_URL2}/api/saveSymptoms`,
};
