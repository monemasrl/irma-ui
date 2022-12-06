type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  phoneNumber?: number;
};

export type Role = 'standard' | 'admin';

export default User;
