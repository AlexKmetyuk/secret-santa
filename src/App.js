import {
  Button,
  Footer,
  Header,
  Loader,
  LoginForm,
  Logo,
  RegisterForm,
  Sign,
  UserInfo,
} from "./components";
import "./App.scss";
import { useEffect, useState } from "react";
import Snow from "./components/Snow/Snow";
import { api } from "./services/api";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setShowLoader(true);
      console.log("Login");
      api
        .getMyUser()
        .then((res) => {
          setUser(res);
          setIsLogin(true);
          setShowLoader(false);
        })
        .catch((err) => {
          setShowLoader(false);
          console.log(err);
        });
    }
  }, []);

  const onLogin = ({ token, user }) => {
    localStorage.setItem("token", token);

    setUser(user);
    setIsLogin(true);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <div className="App">
      <Snow />
      <Header />

      <main>
        {showLoader ? (
          <Loader />
        ) : isLogin ? (
          <UserInfo user={user} showLoader={setShowLoader} />
        ) : (
          <Sign onSubmit={onLogin} showLoader={setShowLoader} />
        )}
      </main>
      <Footer />

      {isLogin ? (
        <div className="logout">
          <Button title="Logout" onClick={onLogout} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
