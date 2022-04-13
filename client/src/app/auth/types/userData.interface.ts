export interface UserDataInterface {
  message: string;
  user: {
    email: string;
    id: string;
    token: string;
    country: string;
    expiresIn: number | string;
  };
}
