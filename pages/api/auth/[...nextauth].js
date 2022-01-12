// NAWZA PLIKU WAZNA - paczka next-auth will expose multiple routes for user log in and for log out i kilka innych
// można w tym folderze swoje pliki/api jak np signup ale NAZWY NIE MOGA NADPISAC TYCH Z BILBIOTEKI
// dokuemntacja https://next-auth.js.org/getting-started/rest-api np.: GET /api/auth/signin

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

// PAMIETAC O execute - zwraca nową funkcję a handler function it needs to beacause it is stil and API route , a api route zawsze musi export funkcji
// przyjmuje konfiguracyjny obiekt
export default NextAuth({
  // żeby mieć pewnosć, ze obiekt JWT został utworzony https://next-auth.js.org/configuration/options
  // w tym obiekcie mozna skonfigurowac jak authenticated user willbe managed
  //sesje można zapisac w bazie danych  https://next-auth.js.org/configuration/options#session
  // ale for credentials based authentication  for this Provider [Providers.Credentails] you must use [jwt] and set this to true
  //   jwt z uatomatu były ustawiony na true jeśli nie wyspecyfikowało się bazy danych and we didn't specife database,
  // because we handled all database access manualy anyways with this specyfic providers,a el explicit ustawianie [jwt:true] też jest spoczko
  //   jak sie uzywa innych providerów to mozna ustawić sesje, ale to zależy już od "Authenticaed Providers" z dokumentacji np jak używac się Email to trzeba w bazie zapisac magiczny link i w tedy nie trzeba używac jwt
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
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
        const isValid = await verifyPassword(
          credentails.password,
          user.password
        ); //async funkcja zwraca Promisa

        if (!isValid) {
          //nieprawidłowe hasło podane
          client.close(); // pamietać o zamykaniu połaczenia do naszej bazy
          throw new Error("Could not  log you in!");
        }

        client.close(); // pamietać o zamykaniu połaczenia do naszej bazy

        //user jest ok - zwracamy obiekt - dajemy znać NextAuth({ że autoryzacja sie powiodła - user jest zalogowany
        //   obiket będzie zakodowany w JSON Web Token
        // nie powinniśmy przekazywac całego obiketu usera, ponieważ nie chcemy dodać hasła nawet jeśli jest zahaszowane to i tak we don;t want to expose to the client
        return { email: user.email }; //to jest obiekt który zwracamy i któy będzie zakodaowany w json web token
        //   zeby mieć pewnosc że obiekt JWT jest utworzony musimy iśc do konfiguracji obiekt NextAuth
      },
    }),
  ],
});
