import { useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate('/'); // Go to home if no previous page exists
    }
  };

  return goBack;
};
