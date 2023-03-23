export type UserProps = {
  id: string;
  name: string;
  email: string;
  pw: string;
};

export type UserResponseBody = {
  token: string;
  user: UserProps;
};
