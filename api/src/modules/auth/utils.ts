import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { addSeconds, getUnixTime } from "date-fns";
import { isArray } from "lodash";

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

export function isAuthenticated(headers: Record<string, string | string[] | undefined>): boolean {
  const header = headers["authorization"];

  // Case note: No support for multiple Authorization headers to avoid header injection attacks
  if (!header || isArray(header)) {
    return false;
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer") {
    return false;
  }

  try {
    jwt.verify(token, config.auth.jwtSecret);
    return true;
  } catch (err) {
    return false;
  }
}
