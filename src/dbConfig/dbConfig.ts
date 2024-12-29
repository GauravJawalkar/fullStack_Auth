import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongo Db connection error , Check the connection to mongodb : ", err
      );
      process.exit();
    });

    console.log(connection);
  } catch (error) {
    console.log("Error Connecting the database", error);
  }
}
