// src/apiConfig.ts
const BASE_URL = "http://192.168.1.2:3003"; // Replace with your backend base URL
const BASE_URL2 = "http://172.18.116.122:6000";

// export const API = {
//   LOGIN: `${BASE_URL}/api/login`,
//   REGISTER: `${BASE_URL}/api/signup`,
//   // Add more endpoints as needed
//   UPLOAD_DOC: `http://172.18.116.122:3001/upload-doc`,
//   SUMMARIZE: `http://172.18.116.122:3001/summarize`,
//   TRANSCRIBE: `http://172.18.116.122:3000/transcribe`,
//   SAVE_EXTRACTED_DATA: `${BASE_URL2}/saveData`, //to store the final document on reviewand Submit stage
//   GET_SAVED_DATA: `${BASE_URL2}/getSavedData`, //to get the saved Doc, done on the above step
//   GET_DAILY_MEDICINE_STATUS: `${BASE_URL2}/api/dailyMedicineStatus`,
//   STORE_DAILY_MEDICINE: `${BASE_URL2}/api/storeDailyMedicine`,
//   STORE_SYMPTOMS: `${BASE_URL2}/api/saveSymptoms`,
//   GET_SYMPTOMS: `${BASE_URL2}/api/getSymptoms`,
// };

const newURL = "http://192.168.1.4:7000";

export const API = {
  LOGIN: `${newURL}/login`,
  REGISTER: `${newURL}/signup`,
  // Add more endpoints as needed
  SAVE_USER_DETAILS: `${newURL}/saveUserDetails`,
  GET_USER_DETAILS: `${newURL}/getUserDetails`,

  UPLOAD_DOC: `${newURL}/upload-doc`,
  SUMMARIZE: `${newURL}/summarize`,
  TRANSCRIBE: `${newURL}/transcribe`,

  SAVE_EXTRACTED_DATA: `${newURL}/saveData`, //to store the final json on reviewand Submit stage
  GET_SAVED_DATA: `${newURL}/getSavedData`, //to get the saved Doc, done on the above step

  GET_DAILY_MEDICINE_STATUS: `${newURL}/api/dailyMedicineStatus`,
  STORE_DAILY_MEDICINE: `${newURL}/api/storeDailyMedicine`,
  GET_FULL_MEDICINE_STATUS: `${newURL}/api/getFullMedicineStatus`,

  STORE_SYMPTOMS: `${newURL}/api/saveSymptoms`,
  GET_SYMPTOMS: `${newURL}/api/getSymptoms`,

  DELETE_DATA: `${newURL}/deleteData`,
};
