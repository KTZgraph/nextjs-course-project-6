//authentication-related utilities
import { hash } from "bcryptjs";

export async function hashPassword(password) {
  // drugi argument to liczba rund salting-rounds identycznie jak w Androdiz w Javie i podobnie jak w Django
  // zwraca promisa
  const hashedPassword = await hash(password, 12); //doczytać ile tam było wyło w OWASP rund bezpiecznie
  return hashedPassword;
}
