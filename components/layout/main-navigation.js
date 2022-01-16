import Link from "next/link";
// do pokazywania widoków tylko dla zalogowanych userów - useSession hook gdy używanmy fukcyjncyh komponentów Reacta
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession(); //takie dane zwraca ten hook

  function logoutHander() {
    signOut(); //zwraca Promisa kiedy jest zrobione ale sie tym nie przejmuję bo komponent będzie automatycznie przeładowany jak 
    //tylko session obiekt z hooka się zmieni;  a zmieni się gdy sie wylogujemy
    // nextjs wyczyści cookie i tę informację that this active user is log in
    
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {/* pokaż login link tylko gdy nie ma sesji i nie ładujemy*/}
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {/* pokazać profil tylko gdy useris authenticated */}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {/* wylogowanie pokazać tylko gdy mamy sesję */}
          {session && (
            <li>
              {/* funckjonalnosc wylogowywania */}
              <button onClick={logoutHander}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
