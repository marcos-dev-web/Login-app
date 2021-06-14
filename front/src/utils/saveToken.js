const saveToken = (token) => {
  window.localStorage.setItem('token', token);
  return true;
}

export default saveToken;