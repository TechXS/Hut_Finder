import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {selectLandlordData} from "../../stores/landlordSlice";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { setCurrentProperty } from "../../stores/propertySlice";

const PropertyCard = ({data}) => {
    const {properties} = useSelector(selectLandlordData);
    const dispatch = useDispatch();
    const setProperty = (property) => {
        dispatch(setCurrentProperty(property));
    }

    return (
        <>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
                <Link to='/landlord/addproperty'>
                    <Card sx={{
                        height: "14rem",
                        minWidth: 275,
                        maxWidth: 290,
                        borderRadius: "12px",
                        ":hover": {
                            backgroundColor: "#f9f9f9"
                        }
                    }} variant="elevation">
                        <CardContent sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            position: "relative",
                            height: "100%"
                        }}>
                            <AddIcon
                                style={{
                                    fontSize: "4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            />
                            <Typography variant="h5" component="div">
                                Add Property
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
                {
                    properties && properties.map((property, index) => (
                        <Link to={`/landlord/properties/${property._id}`}
                              key={property._id}
                              onClick={() => setProperty(property)}
                              >
                            <Card sx={{
                                height: "14rem",
                                minWidth: 275,
                                maxWidth: 290,
                                borderRadius: "12px",
                                ":hover": {
                                    backgroundColor: "#f9f9f9"
                                }
                            }} variant="elevation">
                                <CardContent sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    height: "100%"
                                }}>
                                    <div>
                                        <Typography variant="h4" component="div" sx={{fontSize: 24, fontWeight: "bold"}}>
                                            {property.name}
                                        </Typography>
                                        <Typography
                                            sx={{fontSize: 14}}
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {property.location.city && property.location.country ? `${property.location.city}, ${property.location.country}` : property.location.city ?? property.location.country ?? property.location.continent ?? property.location.formatted}

                                        </Typography>
                                    </div>

                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        PROPERTY {index + 1}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                }
            </Box>
        </>
    );
};

export default PropertyCard;