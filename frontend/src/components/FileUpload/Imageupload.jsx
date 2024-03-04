import { Box, Button, Input, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'


const Imageupload =forwardRef((props, ref) => {
    const inputRef = useRef(null);
    const [images, setImages] = useState([])
    
    const handlePreview=()=>{
        inputRef.current.click();
    };


    useImperativeHandle(ref, () => ({
        submitForm: () => {
            //put submit logic here



          console.log(images)
          setImages([])
        },
      }));




    const handleImageChange =(event)=>{
        const file = event.target.files[0];
        if (file){
            setImages(prevImages => [...prevImages, file])
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
                onClick={handlePreview}
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
                {images.map((image, index)=><img  style={{height:'100px', width:'100px',margin:'5px'}} key={index} src={URL.createObjectURL(image)} alt=''/>)}
            </Box>

        </Paper>
    </div>
  )
})

export default Imageupload
