import Role from './role';

type User = {
  email: string;
  first_name: string;
  last_name: string;
  roles: Role[];
};

export default User;
