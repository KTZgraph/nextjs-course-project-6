// rozwiazanie redundangedo zapystania o session //localhost:3000/api/auth/session po odświeżeniu SPA w pages/profile.js
import { Provider } from "next-auth/client"; //wrapper REKOMENDOWANY PATTERN optymalizacji

import Layout from "../components/layout/layout";
import "../styles/globals.css";

// pageProps argument determined by getStaticProps or getServerSideProps np w pages/profile.js props:{session}
// więc wiemy że niektóre pages będą mieć session prop with  session data so we can set this session for the session Provider component
// pageProps.session przez większośc czasu undefined bo większośc stron nie ma tego prop ale np profle page ma to wiec pozwala 
// to na ominiecie dodatkowego sprawdzania sesji jeśli już mamy sesje z getServerSideProps funckji
// jak jest undefined to będzie robić dodatkowe zapytanie , ale i tak to nam pozwala zaoszczezić kilka redundancyh requestów
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
