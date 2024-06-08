import { TLoginuser } from "./auth.interface";

//  ! login
const loginUser = async (payload: TLoginuser) => {
  console.log(payload);

  return null;
};

export const authServices = {
  loginUser,
};
