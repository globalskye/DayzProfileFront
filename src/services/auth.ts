export const authHeader = () => {
    const secretKey = localStorage.getItem("authorization");
  
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
  