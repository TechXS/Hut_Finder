import { useState, useEffect } from "react";
import { useGetPropertiesQuery } from "../../stores/clientApi.js";
import SearchItem from "../../components/SearchItem/SearchItem";
import Pagination from "../../components/Pagination/Pagination";

const PropertyList = ( { filterCondition, search } ) => {
  const { data: properties, error, isLoading } = useGetPropertiesQuery();
  const [activePage, setActivePage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [filteredProperties, setFilteredProperties] = useState([]);
 
  useEffect(() => {
    if (properties) {
      let filteredProperties = properties; 
      filteredProperties = properties.filter((property) =>
      filterCondition.length > 0
        ? filterCondition.every((filterCriteria) =>
            property.amenities.map((amenity) => amenity.name).includes(filterCriteria)
          )
        : properties
    );
    if (search) {
      filteredProperties = filteredProperties.filter((property) =>
        property.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
      console.log("Filtered Properties:", filteredProperties);
      setFilteredProperties(filteredProperties);
    }
  }, [properties, filterCondition, search]);

  if (isLoading) {
    return <div>Loading...</div>;
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
