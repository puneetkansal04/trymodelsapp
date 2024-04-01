import { useEffect } from 'react';
import InAppReview from 'react-native-in-app-review';

const useInAppReview = () => {
  useEffect(() => {
    // Function to trigger in-app review
    const requestReview = async () => {
      try {
        await InAppReview.RequestInAppReview();
      } catch (error) {
        console.error('Error requesting in-app review: ', error);
      }
    };

    // Call requestReview when the component mounts
    setTimeout(() => {
        requestReview();
    }, 30000);

    // Clean up
    return () => {};
  }, []);

  return null; // You can return whatever you want here
};

export default useInAppReview;
