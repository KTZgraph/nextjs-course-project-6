import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  //extract incoming data
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    // invalid data
    res
      .status(422)
      .json({
        message:
          "Invalid input - password shoul also be at least 7 characters long",
      });
    return;
  }


  // connect to database
  const client = connectToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  //zwraca promsia
  const result = db.collection("users").insertOne({
      email,
      password: hashedPassword //nie zapisać hasła jako plaintext
  });


  res.status(201).json({message: 'Created user!'});
}

export default handler;
