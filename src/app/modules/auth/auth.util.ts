import Jwt from "jsonwebtoken";

const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expire: string
) => {
  return Jwt.sign(jwtPayload, secret, {
    expiresIn: expire,
  });
};

export default createToken;
