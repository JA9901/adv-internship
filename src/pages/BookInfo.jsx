import React, { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import Search from "../components/Search/Search";
import BookInfoDetails from "../components/BookInfoDetails/BookInfoDetails";
import LoginModal from "../components/LoginModal/LoginModal";

function BookInfo({
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
        <BookInfoDetails
          modal={modal}
          toggleModal={toggleModal}
          user={user}
          isPremium={isPremium}
        />
      </div>
    </>
  );
}

export default BookInfo;