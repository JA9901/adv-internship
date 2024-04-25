import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import ForYou from "./pages/ForYou";
import BookInfo from "./pages/BookInfo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Player from "./pages/Player";
import ChoosePlan from "./pages/ChoosePlan";
import Settings from "./pages/Settings";
import app from "./firebase/firebase";
import getPremiumStatus from "./stripe/getPremiumStatus";

function App() {
  const firebase = app;
  const auth = getAuth();

  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  function toggleModal() {
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  }

  function toggleSidebar() {
    if (!sidebar) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user;
        console.log(uid);
        setUser(true);
        // ...
      } else {
        // User is signed out
        setUser(false);
        console.log("User Logged Out");
        // ...
      }
    });
  }, [auth]);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(firebase)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [firebase, auth.currentUser?.uid, auth.currentUser]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home modal={modal} toggleModal={toggleModal} user={user} />}
        />
        <Route
          path="/for-you"
          element={
            <ForYou
              modal={modal}
              toggleModal={toggleModal}
              user={user}
              toggleSidebar={toggleSidebar}
              sidebar={sidebar}
            />
          }
        />
        <Route
          path="/book/:id"
          element={
            <BookInfo
              modal={modal}
              toggleModal={toggleModal}
              user={user}
              isPremium={isPremium}
              toggleSidebar={toggleSidebar}
              sidebar={sidebar}
            />
          }
        />
        {user && (
          <Route
            path="/player/:id"
            element={
              <Player
                modal={modal}
                toggleModal={toggleModal}
                user={user}
                toggleSidebar={toggleSidebar}
                sidebar={sidebar}
              />
            }
          />
        )}
        <Route
          path="/choose-plan"
          element={<ChoosePlan isPremium={isPremium} />}
        />
        <Route
          path="/settings"
          element={
            <Settings
              modal={modal}
              toggleModal={toggleModal}
              user={user}
              isPremium={isPremium}
              toggleSidebar={toggleSidebar}
              sidebar={sidebar}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;