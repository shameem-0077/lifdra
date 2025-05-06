import { useAuthStore } from '../store/authStore';

// Create a function to get the store state
const getAuthState = () => useAuthStore.getState();

const auth = {
  /**
   * Checks if the user is authenticated
   * @returns {boolean} True if user is authenticated, false otherwise
   */
  isAuthenticated: () => {
    const { user_data, is_verified } = getAuthState();
    
    // Check if user data exists and is verified
    return Boolean(user_data && is_verified && user_data.access_token);
  },

  /**
   * Login function to set authentication state
   * @param {Function} callback - Optional callback function to execute after login
   * @returns {boolean} True if login was successful
   */
  login: (callback) => {
    const { user_data } = getAuthState();
    
    if (user_data && user_data.access_token) {
      if (typeof callback === 'function') {
        callback();
      }
      return true;
    }
    return false;
  },

  /**
   * Logout function to clear authentication state
   * @param {Function} callback - Optional callback function to execute after logout
   * @returns {boolean} True if logout was successful
   */
  logout: (callback) => {
    const { resetAuth } = getAuthState();
    
    resetAuth();
    
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  }
};

export default auth; 