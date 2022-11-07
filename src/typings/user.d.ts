type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
};

export type Role = 'standard' | 'admin';

export default User;
