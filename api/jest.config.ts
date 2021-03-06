import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: { "^.+\\.(ts)?$": "ts-jest" },
};

export default config;
