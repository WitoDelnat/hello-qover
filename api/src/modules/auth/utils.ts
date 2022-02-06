import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { addSeconds, getUnixTime } from "date-fns";

export function createSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function createHash(input: string, salt: string): string {
  return crypto.pbkdf2Sync(input, salt, 1000, 64, `sha512`).toString(`hex`);
}

export function createAccessToken(userId: string): string {
  const claims = {
    sub: userId,
    iss: config.auth.domain,
    aud: config.auth.audience,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(addSeconds(new Date(), config.auth.expiresAfterSeconds)),
  };

  return jwt.sign(claims, config.auth.jwtSecret);
}
