export const authHeader = () => {
    const secretKey = localStorage.getItem("secretKey");
  
    if (secretKey) {
      return {
        Authorization: secretKey
      };
    } else {
      return {
        Authorization: ''
      };
    }
  };
  