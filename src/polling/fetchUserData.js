import axios from 'axios';
import { baseUrl } from '../../constants/constants';

const fetchUserData = async () => {
  try {
    // Retrieve the userInfo from localStorage and parse it
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo?.id; // Optional chaining to handle cases where userInfo might be null

    if (userId) {
      // Send POST request with userId in the body
      const response = await axios.post(`${baseUrl}/user-info`, { userId });

      // Update local storage with the fetched user data
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      console.log(response.data.user);
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
};

export default fetchUserData;
