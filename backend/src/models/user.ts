import bcrypt from "bcrypt";

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  id?: number;
};

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public userName: string,
    public password: string,
    public id: number | null = null,
  ) {}

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword(inputedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputedPassword, this.password);
  }

  static async createWithHashPassword(userInput: TUser): Promise<User> {
    const hashedPassword = await User.hashPassword(userInput.password);
    return new User(
      userInput.firstName,
      userInput.lastName,
      userInput.email,
      userInput.userName,
      hashedPassword,
      userInput.id,
    );
  }
}
