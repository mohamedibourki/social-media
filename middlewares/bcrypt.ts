import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const comparePassword = async (password: any, hashedPassword: any) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error: any) {
    throw new Error(error);
  }
};
