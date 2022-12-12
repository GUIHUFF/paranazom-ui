export interface AuthProps {
  username: string;
  password: string;
}

export const AUTH_KEY = "@paranazom-user";

export const isAuthenticated = () => localStorage.getItem(AUTH_KEY) !== null;

export const getAuth = () => {
  const auth = localStorage.getItem(AUTH_KEY);
  return auth;
}

export const setAuth = async ( props: AuthProps) => {
  await localStorage.setItem(AUTH_KEY, JSON.stringify(props));
};

export const removeAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
