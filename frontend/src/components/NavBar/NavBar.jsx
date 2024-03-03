import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const NavBar = () => {
  return (
    <div>
        <Paper 
        elevation={3}
        sx={{ boxShadow: '0px 0px 20px 5px rgba(0, 0, 0, 0.2)' }}
        >
        <Box 
      height={"8vh"}
      width={"100%"}
      max-maxWidth={'1024px'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      >
        <Box>
            <Typography
            sx={{padding:2}}
            to={"/"}><Link>HUT FINDER</Link></Typography>
        </Box>
        <Box
        display={"flex"}
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <Typography
            sx={{padding:2}}
            >
              <Link to="/">
               Home
              </Link>
              </Typography>
            <Typography
            sx={{padding:2}}
            >
              <Link to="/browse">
                Browse
              </Link>
            </Typography>
            <Typography
            sx={{padding:2}}
            >
              <Link>
              Contacts
              </Link>
              </Typography>
            <Link to="/auth/signin/client">
                <Button
                    sx={{backgroundColor:'#07779a'}}
                    variant='contained'>LOGIN</Button>
            </Link>

        </Box>
      </Box>
        </Paper>
     
    </div>
  )
}

export default NavBar
