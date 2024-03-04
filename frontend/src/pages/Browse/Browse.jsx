import "./browse.css"
import Navbar from "../../components/NavBar/NavBar"
import Header from "../../components/Header/Header"
import SearchItemList from "../../components/SearchItem/SearchItem"
import { sampleItems } from "../../utils/dataUtil";

const Browse = () => {
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
            <div className="brItem">
              <label>Options</label>
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
            <SearchItemList items={sampleItems} />
            {/*<SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
  <SearchItem />*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse