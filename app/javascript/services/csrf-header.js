import { CSRF_LOCAL_STORAGE_ID } from '../constants/common';

export default function csrfHeader() {
  const token = JSON.parse(localStorage.getItem(CSRF_LOCAL_STORAGE_ID));

  if (token && token.csrf_token) {
    // for Node.js Express back-end
    return { 'X-CSRF-Token': token.csrf_token };
  }
  return {};
}
