import verifyIfIsLogged from './utils/verifyIfIsLogged';


const isAuthenticated = async () => {
  const isLogged = await verifyIfIsLogged();

  return isLogged;
}


export default isAuthenticated;