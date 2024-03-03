import "./browse.css"
import Navbar from "../../components/NavBar/NavBar"
import Header from "../../components/Header/Header"
import SearchItem from "../../components/SearchItem/SearchItem"
import Pagination from "../../components/Pagination/Pagination"
import React, { useState } from 'react';

const Browse = () => {
    // State to manage the active page
    const cards = [];
    for (let i = 0; i < 100; i++){
      cards.push(<SearchItem key={i} />)
    }
    const [activePage, setActivePage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(6);
    const lastCardIndex = activePage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = cards.slice(firstCardIndex, lastCardIndex);

  return (
    <div>   
      <Navbar/>
      <Header/>
      <div className="browseContainer">
        <div className="browseWrapper">
          <div className="browseSearch">
            <h1 className="brtitle">Search</h1>
            <div className="brItem">
              <label>Search by Property name...</label>
              <input type="text"/>
            </div>
            <br/>
            <hr/>
            <br/>
            <div className="brItem">
              <label className="brtitle">Options</label>
              <div className="brOptionItem">
                <span className="brOptionText">
                  Min price
                </span>
                <input type="number" className="brOptionInput"/>
              </div>
              <div className="brOptionItem">
                <span className="brOptionText">
                  Max price
                </span>
                <input type="number" className="brOptionInput"/>
              </div>
            </div>
            <div className="brItem">
              <label>Filters</label>
              <div className="filterItem">
                <input type="checkbox" id="oceanView"/>
                <label htmlFor="oceanView">Ocean View</label>
              </div>
              <div className="filterItem">
                <input type="checkbox" id="pool"/>
                <label htmlFor="pool">Pool</label>
              </div>
              <div className="filterItem">
                <input type="checkbox" id="undergroundParking"/>
                <label htmlFor="undergroundParking">Underground Parking</label>
              </div>
              <div className="filterItem">
                <input type="checkbox" id="lift"/>
                <label htmlFor="lift">Lift</label>
              </div>
            </div>
            <button className="btn-search">Search</button>
          </div>
          <div className="browseResult">
          {
            currentCards.map((card, index) => (
              <SearchItem key={index} />
            ))
          }
          <Pagination
            totalCards={cards.length}
            cardsPerPage={cardsPerPage}
            setActivePage={setActivePage}
            activePage={activePage}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse

