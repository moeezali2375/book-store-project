export interface DecodedToken {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
}
