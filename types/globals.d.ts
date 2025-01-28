declare global {
  interface CustomJwtSessionClaims {
    fullName: string;
    email: string;
    image: string;
  }
}
