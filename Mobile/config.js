export const API_BASE_URL = 'https://10f9-188-119-27-157.ngrok-free.app/api/v1';
export const ACCOUNT_BASE_URL = 'https://10f9-188-119-27-157.ngrok-free.app/api/Account';

export const announcement_endpoints = {
    announcement: `${API_BASE_URL}/Announcement`  
}

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