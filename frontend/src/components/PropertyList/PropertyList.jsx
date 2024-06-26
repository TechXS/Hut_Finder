import { useState, useEffect } from "react";
import { useGetPropertiesQuery } from "../../stores/clientApi.js";
import SearchItem from "../../components/SearchItem/SearchItem";
import Pagination from "../../components/Pagination/Pagination";
import {Box,CircularProgress} from "@mui/material";
 
const PropertyList = ( { filterCondition, search } ) => {
  const [activePage, setActivePage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const currentLocation = sessionStorage.getItem("location")

  const { data: properties, error, isLoading } = useGetPropertiesQuery(currentLocation);

  console.log(properties)
 
  useEffect(() => {
    if (properties) {
      let filteredProperties = properties; 
      filteredProperties = properties.filter((property) =>
      filterCondition.length > 0
        ? filterCondition.every((filterCriteria) =>
          property.amenities.map((amenity) => amenity.name).includes(filterCriteria),
          // property.units.map((unit) => unit.type).includes(filterCriteria)
          // }
          )
        : properties
    );
    if (search) {
      filteredProperties = filteredProperties.filter((property) =>
        property.name.toLowerCase().includes(search.toLowerCase())
      );
    }

      setFilteredProperties(filteredProperties);
      console.log("filteredProperties", filteredProperties);
    }
  }, [properties, filterCondition, search]);

  if (isLoading) {
    return  <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const lastPropertyIndex = activePage * cardsPerPage;
  const firstPropertyIndex = lastPropertyIndex - cardsPerPage;
  const currentProperties = filteredProperties.slice(
    firstPropertyIndex,
    lastPropertyIndex
  );

  return (
    <>
      <SearchItem properties={currentProperties} />
      <Pagination
        totalCards={filteredProperties.length}
        cardsPerPage={cardsPerPage}
        setActivePage={setActivePage}
        activePage={activePage}
      />
    </>
  );
};

export default PropertyList;
