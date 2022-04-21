import Header from "../components/Header/Header";
import Login from "../components/Login/Login";

function AuthPage({ setIsLoggedIn, setShowModal }) {
  return (
    <>
      <Header />
      <Login setIsLoggedIn={setIsLoggedIn} setShowModal={setShowModal} />
    </>
  );
}

export default AuthPage;
