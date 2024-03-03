import {useCallback, useState} from 'react';
import {Box, CircularProgress, IconButton, Paper, Typography} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// eslint-disable-next-line react/prop-types
function FileUpload({onFileUpload, isProfile = false, url = ''}) {
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.preventDefault();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        setDragOver(false);
        const files = event.dataTransfer.files;
        if (files && files[0]) {
            handleFileChange(files[0]);
        }
    }, []);

    const handleFileChange = (file) => {
        setLoading(true);
        const name = isProfile ? "imageUrl" : "identification_image"
        onFileUpload(file, name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setLoading(false);
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = useCallback((event) => {
        const files = event.target.files;
        if (files && files[0]) {
            handleFileChange(files[0]);
        }
    }, []);

    return (<Box>
        <Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: isProfile ? 'none' : dragOver ? '2px dashed #000' : '2px dashed #aaa',
                padding: isProfile ? 0 : 20,
                textAlign: 'center',
                cursor: 'pointer',
                background: isProfile ? 'none' : dragOver ? '#eee' : '#fafafa',
                position: 'relative',
            }}
        >
            <input
                accept="image/*"
                style={{display: 'none'}}
                id={isProfile ? "imageUrl" : "identification_image"}
                name={isProfile ? "imageUrl" : "identification_image"}
                multiple
                type="file"
                onChange={handleChange}
            />
            <label htmlFor={isProfile ? "imageUrl" : "identification_image"}>
                {imagePreview ? (
                    <Box
                        component="img"
                        src={imagePreview}
                        alt="Image Preview"
                        sx={{borderRadius: 8, width: '100%', height: '100%'}}
                    />) : isProfile ? (<img
                    src={url}
                    alt="Profile Image"
                    className="itemImg"
                    style={{
                        borderRadius: 8, width: "100%", height: "100%"
                    }}
                />) : (<Box display="flex" flexDirection="column" alignItems="center">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <CloudUploadIcon style={{fontSize: 60}}/>
                    </IconButton>
                    <Typography>Drag and
                        drop {isProfile ? 'Profile Picture' : ' Identification Card'} here or click to
                        select files</Typography>
                </Box>)}
            </label>
            {loading && (<CircularProgress
                size={24}
                style={{
                    position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px',
                }}
            />)}
        </Paper>            

    </Box>);
}

export default FileUpload;