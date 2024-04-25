import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import "./Search.css";
import axios from "axios";
import SearchBook from "../ui/SearchBooks/SearchBook";
import Skeleton from "../ui/Skeleton/Skeleton";

function Search({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [completedSearch, setCompletedSearch] = useState(true);
  const inputRef = useRef();

  function handleSearch(event) {
    if (event.target.value) {
      setCompletedSearch(false);
      setSearching(true);
      setSearchData([]);
      setTimeout(() => {
        setSearchTerm(event.target.value);
      }, 500);
    } else {
      setSearching(false);
      setCompletedSearch(true);
      setSearchTerm("");
      setSearchData([]);
    }
  }

  async function getData(input) {
    if (input) {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${input}`
      );
      setSearchData(data);
      setCompletedSearch(true);
    } else {
      setSearchData([]);
      setCompletedSearch(true);
    }
  }

  function clearInput() {
    setSearching(false);
    setCompletedSearch(true);
    setSearchData([]);
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    getData(searchTerm);
  }, [searchTerm]);

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <div></div>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                type="text"
                onChange={handleSearch}
                className="search__input"
                placeholder="Search for books"
                name=""
                id=""
                ref={inputRef}
              />
              {searching ? (
                <div
                  className="search__icon"
                  onClick={clearInput}
                  style={{ cursor: "pointer" }}
                >
                  <FaTimes />
                </div>
              ) : (
                <div className="search__icon">
                  <BsSearch />
                </div>
              )}
            </div>
          </div>

          <div className="sidebar__toggle--btn" onClick={toggleSidebar}>
            <AiOutlineMenu />
          </div>
        </div>
        {searching ? (
          <div className="search__books--wrapper">
            {searchData.length === 0 &&
              !completedSearch &&
              new Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} height="80px" width="100%" />
                ))}

            {searchData.length === 0 && completedSearch && (
              <div className="search__text">No books found</div>
            )}

            {searchData.length > 0 &&
              completedSearch &&
              searchData.map((book) => (
                <SearchBook key={book.id} book={book} />
              ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Search;