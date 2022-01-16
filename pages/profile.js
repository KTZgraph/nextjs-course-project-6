// chroniona - ma być widoczna tylko dla zalogowanego użytkownika
// chronić bezpośrednio na tej stronie labo na komponencie tej strony
import { getSession } from "next-auth/client"; //tej funckje mozna uzywać po stronie klient ajak i serwera

import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

// problem migania danych - podstrony /profile dla niezalogowane użytkownika

export async function getServerSideProps(context) {
  // ważny klucz [req] w konfiguracyjnym obiekcie
  // pod spodem sprawdza czy jest cookie, czy ono w ogóle istneije
  const session = await getSession({ req: context.req });
  // session === nulll gdy user is not authenticated
  // session obiekt prawdziwy gdy zalogowany

  if (!session) {
    return {
      // przekierowanie usera - [redirect] inny parametr zamiast props
      redirect: {
        // przekierowanie działa od razu to userowi nie będą migać żadne strony niedfostępne dla niezalwoanych
        destination: "/auth",
        // informacje czy ten redirect jest zawsze czy tylko czasowy - tutaj false bo tylko gdy niezalogowany przekierowujemy
        permament: false,
      },
    };
  }

  // jest sesja - user jest zalogowany
  return {
    // przekazanie sesji jako  props i teraz komponent UserProfile nie musi po stronei klienta szukac czy jest sesja
    props: { session },
  };
}

/*zła funckja do rozwiązani problemu migania postrony - bo działa tylko podczas [npm run build], moze działać z revalidate parametrem
// NIE DZIAL ADLA KAZDEGO NADCHODZĄCEGO REQUESTU a tutaj trzeba za każdym razem sprawdzać czy user ma sesje
export function getStaticProps() { 
  // pozwala na pobranie danych dla tej strony z wyprzedzeniem
}*/

export default ProfilePage;
