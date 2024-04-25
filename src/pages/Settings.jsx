import React, { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import Search from "../components/Search/Search";
import SettingsLanding from "../components/SettingsLanding/SettingsLanding";
import LoginModal from "../components/LoginModal/LoginModal";

function Settings({
  modal,
  toggleModal,
  user,
  isPremium,
  toggleSidebar,
  sidebar,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {modal && <LoginModal toggleModal={toggleModal} />}

      <div className="wrapper">
        <SideBar
          modal={modal}
          toggleModal={toggleModal}
          user={user}
          sidebar={sidebar}
          toggleSidebar={toggleSidebar}
        />
        <Search toggleSidebar={toggleSidebar} />
        <SettingsLanding
          modal={modal}
          toggleModal={toggleModal}
          user={user}
          isPremium={isPremium}
        />
      </div>
    </>
  );
}

export default Settings;