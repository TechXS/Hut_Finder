import React from 'react'
import Paper from '@mui/material/Paper';
import { Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import sky from '/images/simone-hutsch-FaUSKa3bLiw-unsplash.jpg';
import Frostyform from '../FrostyForm/Frostyform';



 

const HeroSection = () => {


  return (
    <div>
      <Paper 
      elevation={3} >
        <Box 
        height={"90vh"}
        width={"100vw"}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        >

            <Box 
            sx={{backgroundImage:`url(${sky})`,
            backgroundSize:'cover',
            backgroundRepeat:"none",
          }}
            width={"85vw"}
            height={"85vh"}
            borderRadius={"10px"}
            display={'flex'}
            justifyContent={'space-evenly'}
            flexDirection={'column'}
            padding={'30px'}
            >
              <Box
              //for the h2 text 
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'column'}
            height={'40vh'}
              >
                <Typography variant="h1">
                    Find Your best 
                </Typography>
                <Typography variant="h1">
                    Real Estate
                </Typography>

                <Typography 
                sx={{width:'40vw'}}
                variant="p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo distinctio voluptatum eveniet consequuntur, error vel provident minima sit quae inventore! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta quaerat aliquam delectus accusamus, libero quam iste eveniet dolorum neque inventore!
                </Typography>
              </Box>
              <Frostyform />
            </Box>


            </Box>
      </Paper>

    </div>
  )
}

export default HeroSection
