import { Box, Button, Input, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useRef, useState } from 'react'


const ImageuploadSingle = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState('')
    
    const handleSubmit=()=>{
        inputRef.current.click();
    };
    const handleImageChange =(event)=>{
        const file = event.target.files[0];
        if (file){
            console.log(file);
            setImage(file)
        }
    };

  return (
    <div>
        <Paper
        elevation={3}
        component={'form'}
        display={'flex'}
        flexDirection={'column'}
        sx={{margin:'20px', maxWidth:'450px'}}
        
        >
            <Box
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}
            >
                <input type='file' ref={inputRef} onChange={handleImageChange}  style={{display:'none'}}/>
                <Button  
                startIcon={<CloudUploadIcon />} 
                variant="contained" 
                onClick={handleSubmit}
                sx={{margin:'5px'}}>
                    Add Image
            </Button>

            </Box>
            <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            alignItems={'start'}
            >
                {image?<img  style={{height:'100px', width:'100px',margin:'5px'}}  src={URL.createObjectURL(image)} alt=''/>: <p>Preview</p>}
            </Box>

        </Paper>
    </div>
  )
}

export default ImageuploadSingle
