export const API_BASE_URL = 'https://d41e-188-119-36-242.ngrok-free.app/api/v1';
export const ACCOUNT_BASE_URL = 'https://d41e-188-119-36-242.ngrok-free.app/api/Account';

export const lecture_endpoints = {
    courseSchedule: `${API_BASE_URL}/Lecture/Lecturer`
}

export const account_endpoints = {
  authenticate: `${ACCOUNT_BASE_URL}/authenticate`,
  currentUser: `${ACCOUNT_BASE_URL}/current-user`,
  updatePassword: `${ACCOUNT_BASE_URL}/update-password`,
  confirmEmail: `${ACCOUNT_BASE_URL}/send-confirm-email`,
  setPhoneNumber: `${ACCOUNT_BASE_URL}/set-phone-number`,
  forgotPassword: `${ACCOUNT_BASE_URL}/forgot-password`,
  resetPassword: `${ACCOUNT_BASE_URL}/reset-password`,
  register: `${ACCOUNT_BASE_URL}/register`,
}  

export const parkArea_endpoints = {
  getAllParkAreas: `${API_BASE_URL}/ParkArea`
}

export const parkRecords_endpoints = {
  createParkRecord: `${API_BASE_URL}/ParkRecord`,
  getParkRecords: `${API_BASE_URL}/ParkRecord/UserId`
}