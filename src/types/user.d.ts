type UserSignUp = {
  username: string;
  email: string;
  password: string;
};

type Query = {
  filter: string;
  values: string
}

export { UserSignUp, Query };
