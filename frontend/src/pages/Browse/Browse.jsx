import "./browse.css"
import Navbar from "../../components/NavBar/NavBar"
import Header from "../../components/Header/Header"
import PropertyList from "../../components/PropertyList/PropertyList"
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const Browse = () => {
  const [filterCondition, setfilterCondition] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  console.log(Object.fromEntries([...searchParams]));


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
      {/* <Header/> */}
      <div className="browseContainer" style={{paddingTop:'20px'}}>
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
                  value="Parking"
                  onChange={filterHandler}
                 />
                <label htmlFor="oceanView">Parking</label>
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
                  value="Wifi"
                  onChange={filterHandler}
                  />
                <label htmlFor="undergroundParking">Wifi</label>
              </div>
              <div className="filterItem">
                <input 
                  type="checkbox" 
                  id="lift"
                  value="Washrooms"
                  onChange={filterHandler}
                  />
                <label htmlFor="lift">Washrooms</label>
              </div>
              <div className="filterItem">
                <input 
                  type="checkbox" 
                  id="lift"
                  value="Bike Storage"
                  onChange={filterHandler}
                  />
                <label htmlFor="lift">Bike Storage</label>
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

