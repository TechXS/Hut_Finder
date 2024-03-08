import React from "react"
import SearchItemList from "../SearchItem/SearchItem"
import { wishlistItems } from "../../utils/dataUtil"

const Wish = () => {
    return (
        <div style={{paddingLeft:'80px',paddingRight:'80px'}}>
            <ul>
                <h1 style={{padding:'20px'}}>Your Wishlist</h1>
                <SearchItemList items={wishlistItems} />
                </ul>
        </div>
)}

export default Wish;