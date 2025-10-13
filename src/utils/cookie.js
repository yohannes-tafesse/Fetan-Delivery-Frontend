import Cookies from 'js-cookie';

export const setAuthCookie = (token) => {
  Cookies.set('auth_token', token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'strict' // Prevent CSRF attacks
  });
};

export const getAuthCookie = () => {
  return Cookies.get('auth_token');
};

export const removeAuthCookie = () => {
  Cookies.remove('auth_token');
};
