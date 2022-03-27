import { useState } from "react";

import Header from "../components/Header/Header";
import Login from "../components/Login/Login";

function AuthPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Header />
      <Login setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default AuthPage;
