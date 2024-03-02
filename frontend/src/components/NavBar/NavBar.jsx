import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const NavBar = () => {
  return (
    <div>
        <Paper 
        elevation={3}>
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
            to={"/"}><Link>TMS FINDER</Link></Typography>
        </Box>
        <Box
        display={"flex"}
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <Typography
            sx={{padding:2}}
            to={"/"}><Link>Home</Link></Typography>
            <Typography
            sx={{padding:2}}
            to={"/"}><Link>Browse</Link></Typography>
            <Typography
            sx={{padding:2}}
            to={"/"}><Link>About us</Link></Typography>
            <Typography
            sx={{padding:2}}
            to={"/"}><Link>Contacts</Link></Typography>
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
