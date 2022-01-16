import Link from "next/link";
// do pokazywania widoków tylko dla zalogowanych userów - useSession hook gdy używanmy fukcyjncyh komponentów Reacta
import { useSession } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession(); //takie dane zwraca ten hook

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
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
