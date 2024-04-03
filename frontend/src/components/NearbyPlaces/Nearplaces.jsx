import * as React from 'react';
import { useGetNearbyPlacesOfPropertyQuery } from '../../stores/propertyApi'; // Import the query hook
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { selectCurrentProperty } from '../../stores/propertySlice';
import {useDispatch, useSelector} from "react-redux";
import { CircularProgress } from '@mui/material';
export default function AnchorTemporaryDrawer({propertyId}) {
  
  const { data, error, isLoading } = useGetNearbyPlacesOfPropertyQuery(propertyId);

  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, bottom: open });
  };

  
  console.log(propertyId)
  const list = () => {
    if (isLoading) return <div><CircularProgress/></div>; // Show loading indicator
    if (error) return <div>Error: {error.message}</div>; // Show error message if fetching data fails
    if (!data) return null; // Don't render if data is not available

    return (
      <div style={{
        width: '100%',
        maxHeight: '60vh', // Limiting height to 60% of viewport height
        overflowY: 'auto', // Enable vertical scrolling
        
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
>
<div>
  <h2 style={{position:'relative',padding:'15px'}}>Near By Places</h2>
      {data.map(place => (
        <ListItem>
        <ListItemButton key={place.name} style={{ marginBottom: '10px', display:'flex',flexDirection:'row',padding:'10px',border:'10px' ,justifyContent:'space-between',textOverflow:'initial'}}>
          <ListItemIcon>
          <img key={place.icon} src={place.icon} alt={place.icon} style={{ width: '40px', height: '40px', marginRight: '10px' ,borderRadius:'50px'}}/>
          {place.name}
          <p style={{justifyContent:'space-between'}}>
          <p style={{display:'flex',flexDirection:'row'}}> 
          <p style={{ color: place.business_status === 'OPERATIONAL' ? 'green' : 'red' ,display:'flex',flexDirection:'row',fontWeight:'bold' ,paddingRight:'20px'}}>
            {place.business_status}
          </p>
          
          <p style={{ color: place.open_now ? 'green' : 'red',display:'flex',flexDirection:'row' }}>
            Open Now:{place.open_now ? 'Yes' : 'No'}
          </p>
          </p>
          <p style={{paddingRight:'10px'}}> Location: {place.vicinity}</p>
          <p style={{paddingLeft:'10px'}}>About: {place.types.join(', ')}</p>
          </p>
          </ListItemIcon>

        </ListItemButton>
        </ListItem>
      ))}
    </div>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Near by Places</Button>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
