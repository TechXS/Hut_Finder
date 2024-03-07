import * as React from 'react';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from "@mui/base";
import {setClientLogout} from "../../stores/clientSlice.js";
import {setLandlordLogout} from "../../stores/landlordSlice.js";
import {useLogoutMutation} from "../../stores/authApi.js";
import {useDispatch} from "react-redux";

export default function AccountMenu({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [logout, {data: response, isLoading}] = useLogoutMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (data)=>{
    try{

      const appointmentData = await logout({data: data}).unwrap();
      dispatch(setClientLogout())
      dispatch(setLandlordLogout())
      navigate('/')

    }catch (e) {
      console.error(e.message)
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Account settings">
          <IconButton
              onClick={handleClick}
              size="small"
              sx={{ml: 2}}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
          >
            {/*<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>*/}
            <img src={user.imageUrl} alt={"Profile"} style={{
              fontSize: "20px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              cursor: "pointer"
            }}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to='/client/profile'>
        <MenuItem onClick={handleClose} style={{gap:8}}>
          <AccountCircleIcon/> Profile
        </MenuItem>
        </Link>
        <Link to='/client/appointments'>
        <MenuItem onClick={handleClose} style={{gap:8}}>
          <MeetingRoomIcon/>Appointments
        </MenuItem>
        </Link>

        <Link to='/client/wishlist'>
        <MenuItem onClick={handleClose} style={{gap:8}}>
          <BeenhereIcon/>   Wishlist
        </MenuItem>
        </Link>
        {/*<Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
      </MenuItem>*/}
      <Box onClick={()=> handleLogout(user)}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </Box>
      </Menu>
    </React.Fragment>
  );
}