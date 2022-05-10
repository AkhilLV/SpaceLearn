import Header from "../components/Header/Header";
import Login from "../components/Login/Login";

function AuthPage({ setShowModal }) {
  return (
    <>
      <Header />
      <Login setShowModal={setShowModal} />
    </>
  );
}

export default AuthPage;
