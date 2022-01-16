import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  // nie chcę pokazywac strony do logowania dopóki nie wiem czy user zalogoany czy też nie - dlatego używam useState
  const [isLoading, setIsLoading] = useState(true);

  // żeby user zalogowany nie móg wrócić na stronę df logowania /auth - można to zrobić po stronie klienta jak tutuaj - można wywoał getSession
  // albo przez getServerSideProps jak w /profile.js - też można  wywoał getSession
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        // przekierowanie gdy zalogowany user
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]); //router jako dependency

  if (isLoading) {
    // spinner gdy wiem, czy jest sesja czy nie a jeszcze dane nie są załadowane/ kompoinent niewyrenderowany
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
