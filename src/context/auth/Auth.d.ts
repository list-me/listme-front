export interface AuthContextValues {
  isAuthenticated: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
