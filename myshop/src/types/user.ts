export interface User {
  sub: string; // subject (username)
  email: string;
  nameid: string; // user ID
  jti: string; // JWT ID
  iat: number; // issued at
  exp: number; // expiration
  iss: string; // issuer
  aud: string; // audience
}
