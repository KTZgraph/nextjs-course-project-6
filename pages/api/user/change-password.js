// można ten endpoint dodac do folderu auth
// api/user/change-password

import { getSession } from "next-auth/client"; //działa po serwerze też

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

  if(!session){ //TUTAJ CHRONIMY API przez unatuheticated actions
    //request is not authenticated HTTP 401 authenticated is missing
    res.status(401).json({message: 'Not authenticated!'});
    return;
  }


}

export default handler;
