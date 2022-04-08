export interface UserData {
  message: string;
  user: {
    email: string;
    id: string | number;
    token: string;
    country: string;
    expiresIn: number | string;
  };
}
