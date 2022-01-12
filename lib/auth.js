//authentication-related utilities
import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  // drugi argument to liczba rund salting-rounds identycznie jak w Androdiz w Javie i podobnie jak w Django
  // zwraca promisa
  const hashedPassword = await hash(password, 12); //doczytać ile tam było wyło w OWASP rund bezpiecznie
  return hashedPassword;
}


// sprawdza czy hasło w plaintext mógłby też uzyskać taki hash jak ten z bazy zahashowany - standardowy Bcrypt algorytm
// a jeśli tak to hasła są różne
export async function verifyPassword(plaintextPassword, hashedPassword){
  const isValid =  await compare(plaintextPassword, hashedPassword); //zwraca Promisa - boolean
  return isValid;
}