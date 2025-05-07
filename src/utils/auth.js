import useUserStore from '../store/userStore';

// Create a function to get the store state
const getAuthState = () => {
  return useUserStore.getState();
};

const auth = {
  /**
   * Checks if the user is authenticated
   * @returns {boolean} True if user is authenticated, false otherwise
   */
  isAuthenticated: () => {
    const { user_data } = getAuthState();
    return Boolean(user_data?.access_token);
  },

  /**
   * Login function to set authentication state
   * @param {Object} data - The user data object containing access_token and other user info
   * @param {Function} callback - Optional callback function to execute after login
   * @returns {boolean} True if login was successful
   */
  login: (data, callback) => {
    const { setUserData, setIsVerified } = getAuthState();
    
    if (data?.access_token) {
      // Set user data with is_verified flag
      setUserData({
        ...data,
        is_verified: true
      });
      
      // Set verification status
      setIsVerified(true);
      
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