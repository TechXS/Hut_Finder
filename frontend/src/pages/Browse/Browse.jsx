import "./browse.css"
import Navbar from "../../components/NavBar/NavBar"
import Header from "../../components/Header/Header"
import PropertyList from "../../components/PropertyListing/PropertyListing"
import { useState } from 'react';

const Browse = () => {
  const [filterCondition, setfilterCondition] = useState([]);
  const [search, setSearch] = useState("");


  const filterHandler = (event) => {
    if (event.target.checked) {
      setfilterCondition([...filterCondition, event.target.value])
    } else {
      setfilterCondition(
        filterCondition.filter((filterTag) => filterTag !== event.target.value)
      )
    }
    console.log("filterCondition", filterCondition)
  }

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }

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
              <input 
                type="text"
                onChange={searchHandler}
                value={search}
                />
            </div>
            <br/>
            <hr/>
            <br/>
            <div className="brItem">
              <label className="brtitle">Options</label>
              {/* <div className="brOptionItem">
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
            <div className="brItem"> */}
              <label>Filters</label>
              <div className="filterItem">
                <input
                  type="checkbox" 
                  id="oceanView"
                  value="Ocean View"
                  onChange={filterHandler}
                 />
                <label htmlFor="oceanView">Ocean View</label>
              </div>
              <div className="filterItem">
                <input 
                  type="checkbox" 
                  id="pool"
                  value="Pool"
                  onChange={filterHandler}
                  />
                <label htmlFor="pool">Pool</label>
              </div>
              <div className="filterItem">
                <input 
                  type="checkbox" 
                  id="undergroundParking"
                  value="Underground Parking"
                  onChange={filterHandler}
                  />
                <label htmlFor="undergroundParking">Underground Parking</label>
              </div>
              <div className="filterItem">
                <input 
                  type="checkbox" 
                  id="lift"
                  value="Lift"
                  onChange={filterHandler}
                  />
                <label htmlFor="lift">Lift</label>
              </div>
            </div>
            {/* <button className="btn-search">Search</button> */}
          </div>
          <div className="browseResult">
          <PropertyList filterCondition={filterCondition} search={search}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse

