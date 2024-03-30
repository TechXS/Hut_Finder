import React,{useState} from "react"

import { useSelector } from 'react-redux';
import { selectCurrentClient, selectGetDataError } from '../../stores/clientSlice';
import SearchItemList from "../SearchItem/SearchItem"
import { wishlistItems } from "../../utils/dataUtil"
import { useGetPropertiesQuery } from "../../stores/clientApi.js";
import {Box,CircularProgress} from "@mui/material";
import { useGetWishlistPropertiesQuery } from "../../stores/clientApi.js";


const Wish = () => {
    const Client = useSelector(selectCurrentClient);
    const { data: wishlistProperties, error, isLoading } = useGetWishlistPropertiesQuery(Client?._id); // Fetch wishlist properties for the current client

    if (isLoading) return  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>;
    if (error) return <div>Error: {error.message}</div>;
    console.log('Client\n', Client);
    console.log(Client?.wishlist)
    // Ensure that wishlistProperties is an array before passing it to SearchItemList
    const wishlistPropertiesArray = Array.isArray(wishlistProperties) ? wishlistProperties : [];
    return (
        <div style={{paddingLeft:'80px',paddingRight:'80px'}}>
            <ul>
                <h1 style={{padding:'20px'}}>Your Wishlist</h1>
                <SearchItemList properties={wishlistPropertiesArray} />
                </ul>
        </div>
)}

export default Wish;