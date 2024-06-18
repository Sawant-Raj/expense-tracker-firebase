export const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-new-9d398-default-rtdb.firebaseio.com/${email}/contact-details.json`
      );

      const data = await response.json();
      console.log("Data from useEffect is", data);
      setUserData(data);

      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };