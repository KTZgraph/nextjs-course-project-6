// można ten endpoint dodac do folderu auth
// api/user/change-password

import { getSession } from "next-auth/client"; //działa po serwerze też

import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

// chronione API endpoint
async function handler(req, res) {
  // wydobyć stare i nowe hasło - sprawdzić czy jest to request od zalogowanego użytkownika
  // denie of reaction if not authneticated

  //1.  POSt, PUT, PATCH requesty mają sens dozmiany hasła
  // patch bo tylko zmieniam dane usera a nie twsorze niczego nowego
  if (req.method !== "PATCH") {
    return;
  }

  //2. is from authenitaced user
  //getSession wymaga req bo w tym obiekcie sprawdza czy session cookie is a part of request
  //   - jeśli jest to wyekstrachuje i zrobi waldiacje cookie i jak to ma sens to zwrócic session object [Promise]
  const session = await getSession({ req: req });

  if (!session) {
    //TUTAJ CHRONIMY API przez unatuheticated actions
    //request is not authenticated HTTP 401 authenticated is missing
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  //   3 pobieram dane o użytkowniku
  // teraz wiem, ze jest from authenticated user, potrzebujemy też email usera żeby go zidentyfikować
  // email jest zwracany w obiekcie retunr {email: user.email} na końcu [...nextauth].js - wiec dane są w tokenie i w sesji\
  const userEmail = session.user.email;
  //oldPassword i newPassword musza byc w obiekcie od klient a- to programista tam tworzy obiket z nazwami atrybutów
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  //4 sprawdzam czy stare haslo jest takie jak w bazie porównują hashe
  const client = await connectToDatabase();

  const userCollection = client.db().collection("users");

  //   sdzukanie usera w bazie po emailui wartosci email z sesji
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    //byłoby dziwne jakby był zalogowany user którego nie ma w bazie
    client.close();
    res.status(404).json({ message: "User not found" });
    return;
  }

  // 5  weryfikacja hasła
  const currentPassword = user.password; //zahashowane hasło z bazy - aktualne

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordAreEqual) {
    //   stare hasło nie jest takie jak user miał w bazie
    // HTTP 403 a nie HtTP 401(not authenticated) HTTP 403 because not authorized for this operation even if user is authenticated
    // alternatywnie HTTP 442 bo user input is incorrect
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  //   6 zamiana hasła na nowe w bazie - bo hasło stare jest prawidłowe
  // pierwszy argument fo filtr drugi obkiet update
  // [$set] specjalny klucz rozumiany przez mongodb, zagnieżdzony obiket mówi jakie property należy zmienić

  const hashedPassword = await hashPassword(newPassword); //PAMIETAC O HASHOWANIU HASLA

  //   można dac try catch
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
