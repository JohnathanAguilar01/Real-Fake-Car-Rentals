export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
};

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public userName: string,
    public password: string,
  ) {}
}
