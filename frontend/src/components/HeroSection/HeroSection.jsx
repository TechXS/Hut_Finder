import React from 'react'
import Paper from '@mui/material/Paper';
import { Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import sky from '/images/simone-hutsch-FaUSKa3bLiw-unsplash.jpg';
import Frostyform from '../FrostyForm/Frostyform';



 

const HeroSection = () => {


  return (
        <Box
        minHeight={"90%"}
        width={"100%"}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        overflow={'auto'}
        postion={"relative"}
        >

            <Box 
            sx={{backgroundImage:`url(${sky})`,
            backgroundSize:'cover',
            backgroundRepeat:"none",
          }}
            // width={"85vw"}
            // height={"85vh"}
                width={'90%'}
            minHeight={'85vh'}
            borderRadius={"10px"}
            display={'flex'}
            justifyContent={'space-evenly'}
            postion={"relative"}
            flexDirection={'column'}
            padding={'30px'}
            >
              <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'column'}
            height={'40%'}
              >
             <Box>
               <Typography variant="h1" sx={{
                   fontWeight:"normal"
               }}>
                   Find Your best
               </Typography>
               <Typography variant="h1" sx={{ //#A3D9D9
                   color:"#068585",
                   fontWeight:"bold"
               }}>
                   Real Estate
               </Typography>
             </Box>

                <Typography 
                sx={{width: {
                    xs:'90%',
                        sm:'80%',
                        md:"50%",
                        lg:"40%"
                    },
                    position:"relative"
                    }}
                variant="p">
                    Discover your dream home effortlessly at Hut Finder. Our streamlined platform simplifies your search for the perfect property, offering a diverse range of options. From cozy urban apartments to luxurious countryside retreats, find your ideal home with advanced search filters and detailed listings
                </Typography>
              </Box>
              <Frostyform />
            </Box>
            </Box>
  )
}

export default HeroSection
