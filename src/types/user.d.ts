type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date | null;
};

type UserSignUp = {
  username: string;
  email: string;
  password: string;
};

type UserSignIn = {
  email: string;
  password: string;
};

type UserModification = {
  username?: string;
  email?: string;
  password?: string;
};

type IdParam = {
  id: number;
}

type Query = {
  filter: string;
  values: string;
};

export { UserSignUp, Query, User, UserModification, UserSignIn,IdParam };
