import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, MobileStepper, Select,} from "@mui/material";
import HolidayVillageSharpIcon from "@mui/icons-material/HolidayVillageSharp";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    propertyForm,
    setClearPropertyData,
    setPropertyForm,
    setPropertyFormUnits,
    setUnitForm,
} from "../stores/propertySlice";
import {selectCurrentLandlord} from "../stores/landlordSlice";
import TextField from "@mui/material/TextField";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import {properties} from "../utils/dataUtil.js";
import {useCreatePropertyMutation} from "../stores/propertyApi.js";
import {setErrorNotification, setSuccessNotification,} from "../stores/notificationSlice.js";
import LoadingButton from "@mui/lab/LoadingButton";
import Imageupload from "../components/FileUpload/Imageupload.jsx";

const AddProperty = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [numberOfSteps, setNumberOfSteps] = useState(1);
    const [submitForm, setSubmitForm] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {propertyData, propertyError, unitData, unit} = useSelector(propertyForm);
    const currentLandlord = useSelector(selectCurrentLandlord);
    const theme = useTheme();
    const [
        createProperty,
        {
            data: response,
            isLoading: fetchLoading,
            isError,
            error: fetchError,
            isSuccess,
        },
    ] = useCreatePropertyMutation();


    useEffect(() => {
        (async () => {
            if (submitForm && activeStep === numberOfSteps && numberOfSteps === unitData.length) {
                console.log(propertyData)
                try {
                    const response = await createProperty({
                        id: currentLandlord._id,
                        payload: {data: propertyData},
                    }).unwrap();

                    dispatch(
                        setSuccessNotification(
                            `Property ${response.name} created successfully`
                        )
                    );
                    navigate("/landlord/properties");
                    setActiveStep(1);
                    setNumberOfSteps(1);
                    setSubmitForm(false)
                    dispatch(setClearPropertyData());

                } catch (e) {
                    console.log(e);
                    setSubmitForm(false)
                    dispatch(
                        setErrorNotification(e?.data?.message ?? (e.error || e.message))
                    );
                }
            }
        })()
    }, [propertyData, submitForm])

    useEffect(() => {
        if (isError) {
            dispatch(
                setErrorNotification(fetchError?.data?.message ?? fetchError.error)
            );
        }
    }, [fetchError]);

    const handleNext = () => {
        if (activeStep < numberOfSteps) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleBack = () => {
        if (activeStep > 1) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === "name" || name === "location") {
            dispatch(setPropertyForm({[name]: value}));
        } else if (name === "categories") {
            setNumberOfSteps(parseInt(value));
        } else if (name === "number" || name === "type" || name === "price") {
            dispatch(setUnitForm({[name]: value}))
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setPropertyFormUnits());
        if (activeStep < numberOfSteps) {
            setSubmitForm(false)
            return handleNext();
        } else if (activeStep === numberOfSteps) {
            setSubmitForm(true)
        }
    };

    return (
        <Box
            sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                position: "relative",
                gap: "10rem",
                maxWidth: "80%",
                marginX: "auto",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    my: {xs: 4, md: 6, borderRadius: 20},
                    p: {xs: 2, md: 5},
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    height: "100%",
                    position: "relative",
                }}
            >
                <Box
                    component="form"
                    onChange={handleInputChange}
                    sx={{
                        display: "flex",
                        flex: "0 1 auto",
                        flexDirection: "column",
                        gap: "1.5rem",
                    }}
                >
                    <Grid display="flex" alignItems="center">
                        <HolidayVillageSharpIcon sx={{fontSize: 50}} color="primary"/>
                        <Typography variant="h5" sx={{paddingLeft: 3}}>
                            Create Property
                        </Typography>
                    </Grid>
                    <FormControl>
                        <Typography>Enter the name of the property</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Property Name"
                            name="name"
                        />
                    </FormControl>

                    <FormControl>
                        <Typography sx={{}}>Where is the property located ?</Typography>
                        <FormHelperText id="my-helper-text">
                            eg Nairobi,Kenya
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            label="Property Location"
                            name="location"
                        />
                    </FormControl>
                    <FormControl>
                        <Typography sx={{}}>
                            {" "}
                            How many unit categories does the property have ?
                        </Typography>
                        <FormHelperText id="my-helper-text">
                            Categorise based on the type of units eg 2 for Bedsitter and
                            One-Bedroom
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                            id="categories"
                            label="No. of Unit Types"
                            name="categories"
                            aria-describedby="my-helper-text"
                            value={numberOfSteps}
                        />
                        <Imageupload/>
                    </FormControl>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem={true}/>
                <Box
                    component="form"
                    noValidate
                    onChange={handleInputChange}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        height: "100%",
                        position: "relative",
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel htmlFor="type">Unit Type</InputLabel>
                        <Select
                            required
                            name="type"
                            id="type"
                            label="Unit Type"
                            onChange={handleInputChange}
                            defaultValue={properties[1].value}
                            value={unit.type}

                        >
                            {properties.map((property, index) => (
                                <MenuItem
                                    key={index}
                                    value={property.value}
                                    disabled={property.value === "undefined"}
                                >
                                    {property.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <Typography sx={{}}>
                            {" "}
                            How many units do you have in this category ?
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Number of Units"
                            name="number"
                            type={"number"}
                            aria-describedby="my-helper-text"
                            value={unit.number}

                        />
                    </FormControl>

                    <FormControl>
                        <Typography sx={{}}>How do you charge per unit ?</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            value={unit.price}

                        />
                        <Imageupload />
                    </FormControl>

                    {/*{unitData.length} {activeStep}*/}
                    {/*<Button*/}
                    {/*    fullWidth*/}
                    {/*    type="submit"*/}
                    {/*    variant="contained"*/}
                    {/*    onClick={handleSubmit}*/}
                    {/*    disabled={activeStep === numberOfSteps && numberOfSteps === unitData.length}*/}
                    {/*>*/}
                    {/*    Submit*/}
                    {/*</Button>*/}

                    <LoadingButton
                        loading={fetchLoading}
                        loadingPosition="end"
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        // disabled={
                        //     activeStep === numberOfSteps && numberOfSteps === unitData.length
                        // }
                    >
                        Submit
                    </LoadingButton>

                    <MobileStepper
                        variant="progress"
                        steps={numberOfSteps + 1}
                        position="static"
                        activeStep={activeStep}
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            width: "100%",
                            position: "relative",
                            alignSelf: "flex-end",
                        }}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === numberOfSteps}
                            >
                                Next
                                {theme.direction === "rtl" ? (
                                    <KeyboardArrowLeft/>
                                ) : (
                                    // eslint-disable-next-line react/jsx-no-undef
                                    <KeyboardArrowRight/>
                                )}
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 1}
                            >
                                {theme.direction === "rtl" ? (
                                    <KeyboardArrowRight/>
                                ) : (
                                    <KeyboardArrowLeft/>
                                )}
                                Back
                            </Button>
                        }
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default AddProperty;
