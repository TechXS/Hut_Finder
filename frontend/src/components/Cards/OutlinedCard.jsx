import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );


const OutlinedCard = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
      {data.map((cardData, index) => (
      
        <Box key={index} sx={{ flex: '1 0 30%', minWidth: 275 ,maxWidth:'300px' ,borderRadius: '12px'}}>

       
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                PROPERTY {index + 1}
              </Typography>
              <Typography variant="h5" component="div">
                {cardData.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {cardData.subtitle}
              </Typography>
              <Typography variant="body2">
                {cardData.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Property</Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default OutlinedCard