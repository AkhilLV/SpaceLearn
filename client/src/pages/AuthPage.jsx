import Header from "../components/Header/Header";
import Login from "../components/Login/Login";

function AuthPage({ setIsLoggedIn }) {
  return (
    <>
      <Header />
      <Login setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default AuthPage;
