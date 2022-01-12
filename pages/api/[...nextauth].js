// NAWZA PLIKU WAZNA - paczka next-auth will expose multiple routes for user log in and for log out i kilka innych
// można w tym folderze swoje pliki/api jak np signup ale NAZWY NIE MOGA NADPISAC TYCH Z BILBIOTEKI
// dokuemntacja https://next-auth.js.org/getting-started/rest-api np.: GET /api/auth/signin

import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";

// PAMIETAC O execute - zwraca nową funkcję a handler function it needs to beacause it is stil and API route , a api route zawsze musi export funkcji
// przyjmuje konfiguracyjny obiekt
export default NextAuth({
  providers: Providers.Credentails({
    //   nie chęc żeby next-aut generował za mnie form bo już mam swój
    //   credentails: {
    //   }

    // Asynchroniczna - zwraca Promisa metodaktórą nextjs będzie wywoływał dla nas when it receives incoming request
    async authorize(credentails) {
      //spowiedzam się, że obiekt credentials będzie mieć property email - MY później ustawiamy tutaj obiekt credentials
      // musimy dac swoją logikę autoryzacji, sprawdzić czy kredentiale są prawidłowe i pwoiedzieć użytkownikowi thats is not a case np rthorw Error
      const client = await connectToDatabase();

      // check if we have a user
      const userCollection = client.db().collection("users");
      const user = await userCollection.findOne({ email: credentails.email });

      // jeśli nie ma usera w bazie
      if (!user) {
        //   jak rzucę Error w metodzie authrosei() to metoda odżuci tego Priomisa i by default przekieruje użytkownika do innej strony
        //  - ale my to napiszemy i pokażemy bład na stronie logowania
        throw new Error("No user found");
      }

      // znaleźlismy usera w bazie - trzeba spawdzić hasło podane z tym z bazy
      const isValid = await verifyPassword(credentails.password, user.password); //async funkcja zwraca Promisa

      if (!isValid) {
        //nieprawidłowe hasło podane
        throw new Error("Could not  log you in!");
      }

      //user jest ok - zwracamy obiekt - dajemy znać NextAuth({ że autoryzacja sie powiodła - user jest zalogowany
      //   obiket będzie zakodowany w JSON Web Token
      // nie powinniśmy przekazywac całego obiketu usera, ponieważ nie chcemy dodać hasła nawet jeśli jest zahaszowane to i tak we don;t want to expose to the client
      return { email: user.email }; //to jest obiekt który zwracamy i któy będzie zakodaowany w json web token
    //   zeby mieć pewnosc że obiekt JWT jest utworzony musimy iśc do konfiguracji obiekt NextAuth

      client.close(); // pamietać o zamykaniu połaczenia do naszej bazy
    },
  }),
});
