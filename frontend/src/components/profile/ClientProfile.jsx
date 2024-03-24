import { useState, useEffect } from 'react';
import "./profile.scss";
import { useSelector } from 'react-redux';
import { selectCurrentClient, selectGetDataError } from '../../stores/clientSlice';
import { useUpdateProfileMutation, useUploadProfileImageMutation } from '../../stores/userApi';
import { updateProfileValidation } from '../../utils/formValidation';
import ImageuploadSingle from '../FileUpload/ImageUploadSingle';
//import MuiAlert from '@mui/material/Alert';
//import CustomizedSnackbars from '../Alerts/SnackBar';

//import wishItemList from '../Wishlist/wishlist';
import { wishlistItems } from '../../utils/dataUtil';
import SearchItemList from '../SearchItem/SearchItem';
import StickyHeadTable from '../table/ClientAppointments';
import { clientAppointmentsData } from '../../utils/dataUtil';

const ProfileClient = () => {
  const Client = useSelector(selectCurrentClient);
  console.log('Client\n', Client);
  const error = useSelector(selectGetDataError);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadPic, setUploadPic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [savedFields, setSavedFields] = useState({
    name: Client?.name,
    email: Client?.email,
    phoneNumber: Client?.phoneNumber,
    Role: Client?.role,
    
  });
  const [updateProfile, {
    data: updateResponse,
    isLoading: updateLoading,
    isError: updateIsError,
    error: updateError
  }] = useUpdateProfileMutation()

  const [uploadProfileImage, {
    data: uploadResponse,
    isLoading: uploadLoading,
    isError: uploadIsError,
    error: uploadError
  }] = useUploadProfileImageMutation()

  useEffect(() => {
    setProfilePicture(Client?.imageUrl)
    console.log("profilePicture set")
  },[]);

  const handleEditClick = () => {
    // if (isEditing) {

    // }
    // setIsEditing(!isEditing);
    if (isEditing === false) {
      setIsEditing(!isEditing);
    } else {
      try {
        console.log('Edited fields:', editedFields)
        // const response = updateProfileValidation(editedFields)
        if (validateFields(editedFields)) {
          setSavedFields(prevFields => ({ ...prevFields, ...editedFields }));
        } else {
          alert('Please fill in all the fields with valid values.');
          return;
        }
        console.log("uploadPic", uploadPic)
        if (uploadPic){
          console.log("uploading")
          upload(uploadPic);
        }
        setSavedFields(prevFields => ({ ...prevFields, ...editedFields }));
        const newProfile = updateProfile({
          id: Client._id,
          layout: "client",
          payload: { data: editedFields }
        }).unwrap()
        setIsEditing(!isEditing);
        localStorage.setItem("currentClient", JSON.stringify(newProfile));
      } catch (error) {
        console.error('Failed to update profile', error);
      }
    }
  };

  const validateFields = fields => {
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        if (!fields[key]) {
          return false; // Field is empty
        }
        if (key === 'email' && !isValidEmail(fields[key])) {
          return false; 
        }
      }
    }
    return true;
  };

  const isValidEmail = email => {
    //email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFieldChange = (field, value) => {
    setEditedFields(prevFields => ({ ...prevFields, [field]: value }));
  };

  const renderFieldValue = (field, isInput) => {
    const value = isInput ? editedFields[field] || savedFields[field] : savedFields[field];
    const isFieldEdited = Object.prototype.hasOwnProperty.call(editedFields, field);


    if (isEditing && isInput) {
      return (
        <input
          type="text"
          className={`itemValueInput ${isFieldEdited ? "edited" : ""}`}
          defaultValue={value}
          onChange={e => handleFieldChange(field, e.target.value)}
          />
      );
    } else {
      return (
        
        <span className={`itemValue ${isFieldEdited ? "edited" : ""}`}>{value}</span>
      );
    }
  };
  const upload = async (file) => {
    const formData = new FormData();
    console.log('ufile', file)
    formData.append("hutFinder-profileImages", file, file.name);
    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
    }
    try {
      const response = await uploadProfileImage({
        id: Client._id,
        layout: "client",
        payload: formData
      
      }).unwrap()
      console.log('Upload response:', response);
      setProfilePicture(response.imageUrl);
      console.log("profilePicture", profilePicture)
      localStorage.setItem("currentClient", JSON.stringify(response));
      setUploadPic(null);
    } catch (error) {
      console.error('Failed to upload profile image', error);
      setUploadPic(null);
    }
  }

  const handleFileUpload = (file) => {
    // upload(file)
    // setProfilePicture(file);
    setUploadPic(file);
    console.log('handlefile upload\n', file);
  };

  return (
    <>
    <div style={{paddingLeft:'80px',paddingRight:'80px'}}>
    
    
    
    
    <ul>
      <div className="top">
        <div className="left">
          <div className="editButton" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </div>
          <h1 className="title">Information</h1>
          <div className="item">
            {
              isEditing ? (
                <>
                  <img
                    src={profilePicture}
                    alt=""
                    className="itemImg"
                  />
                  <ImageuploadSingle handleFileUpload={handleFileUpload}/>  
                </>
              ) : (
                <img
                  src={profilePicture}
                  alt=""
                  className="itemImg"
                />
              )
            }
            <div className="details">
              <h1 className="itemTitle">{Client?.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Name:</span>
                {renderFieldValue("name", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                {renderFieldValue("email", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                {renderFieldValue("phoneNumber", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Role:</span>
                {renderFieldValue("Role", true)}
              </div>
              
              
            </div>
            
          </div>
        </div>
    </div>


    <div className="top">
        <div className="left">
          <div className="editButton" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </div>
          <h1 className="title">Property Information</h1>
          <div className="item">
            
            <div className="details">
              <h1 className="itemTitle"></h1>
              <div className="detailItem">
                <span className="itemKey">PropertyName:</span>
                {renderFieldValue("propertyName", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Unit Type:</span>
                {renderFieldValue("unitType", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">House Number:</span>
                {renderFieldValue("houseNumber", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Landlord:</span>
                {renderFieldValue("landLord", true)}
              </div>
            </div>
          </div>
        </div>
    </div>
      </ul>
      </div>
    </>
  );
};

export default ProfileClient;