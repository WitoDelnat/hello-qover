import mongoose from "mongoose";

type MongooseInit = {
  protocol: "mongodb" | "mongodb+srv";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export async function connectMongoose({
  protocol,
  username,
  password,
  host,
  port,
  database,
}: MongooseInit): Promise<void> {
  const uri = `${protocol}://${host}:${port}/${database}`;

  await mongoose.connect(uri, {
    authSource: "admin",
    user: username,
    pass: password,
  });
}
