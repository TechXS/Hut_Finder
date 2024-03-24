import { useState, useEffect } from 'react';
import "./profile.scss";
//import Approval from '../Approval/Approval';
import Datatable from '../Approval/Approval';
import { useSelector } from 'react-redux';
import { selectCurrentLandlord, selectGetDataError } from '../../stores/landlordSlice';
import {useUpdateProfileMutation, useUploadProfileImageMutation} from '../../stores/userApi';
import { updateProfileValidation } from '../../utils/formValidation';
import ImageuploadSingle from '../FileUpload/ImageUploadSingle';

const Profile = () => {
  const Landlord = useSelector(selectCurrentLandlord);
  console.log('Landlord\n', Landlord);
  const error = useSelector(selectGetDataError);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadPic, setUploadPic] = useState(null);
  const [savedFields, setSavedFields] = useState({
    name: Landlord?.name,
    email: Landlord?.email,
    phone: Landlord?.phoneNumber,
    Role: Landlord?.role
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
    setProfilePicture(Landlord?.imageUrl)
    console.log("profilePicture set")
  },[]);

  const handleEditClick = async () => {
    if (isEditing === false) {
      setIsEditing(!isEditing);
    } else {
      try {
        if (validateFields(editedFields)) {
          setSavedFields(prevFields => ({ ...prevFields, ...editedFields }));
        } else {
          alert('Please fill in all the fields with valid values.');
          return;
        }
        console.log("profilePicture", profilePicture)
        if (uploadPic){
          console.log("uploading")
          upload(uploadPic);
        }
          // const response = await updateProfileValidation(editedFields)
          setSavedFields(prevFields => ({ ...prevFields, ...editedFields }));
          const newProfile = await updateProfile({
              id: Landlord._id,
              layout: "landlord",
              payload: {data: editedFields}
          }).unwrap()
          setIsEditing(!isEditing);
          localStorage.setItem("currentLandlord", JSON.stringify(newProfile));
          // dispatch(setSuccessNotification(`${newProfile.name}${newProfile.name.substring(-1, 0) === "s" ? "'" : "'s"} data updated `));
      } catch (e) {
          console.log(e.data.message)
          // dispatch(setGetDataError(`Failed to update landlord data`));
          // dispatch(setErrorNotification(`Failed to update ${user.name}${user.name.substring(-1, 0) === "s" ? "'" : "'s"} data`));
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
    console.log("file", file)
    const formData = new FormData();
    formData.append("hutFinder-profileImages", file, file.name);
    // console.log("formData", formData);
    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
    }
    try {
        const response = await uploadProfileImage({
          id: Landlord._id, 
          layout: "landlord", 
          payload: formData
        }).unwrap()
        console.log("response", response)
        setProfilePicture(response.imageUrl);
        console.log("profilePicture", profilePicture)
        localStorage.setItem("currentLandlord", JSON.stringify(response));
        setUploadPic(null)
        // dispatch(setGetDataSuccess(`Landlord Profile Image updated`));
        // dispatch(setSuccessNotification(`${response.name}${response.name.substring(-1, 0) === "s" ? "'" : "'s"} Profile Image updated`));
    } catch (e) {
        console.log(e)
        console.log(e.data.message)
        setUploadPic(null)
        // dispatch(setGetDataError(`Failed to update landlord Profile Image`));
        // dispatch(setErrorNotification(`Failed to update ${user.name}${user.name.substring(-1, 0) === "s" ? "'" : "'s"}  Profile Image`));
    }
  }

  const handleFileUpload = async (file) => {
    // setProfilePicture(file)
    setUploadPic(file)
    // upload(file)
  };

  return (
    <>
    
      <div className="top">
        <div className="left">
          <div className="editButton" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </div>
          <h1 className="title">Information</h1>
          <div className="item">
            {/* <img
              src={Landlord?.imageUrl}
              alt=""
              className="itemImg"
            />
            <ImageuploadSingle onFileUpload={handleFileUpload} url={Landlord.imageUrl}/> */}
            {
              isEditing ? (
                <>
                  <img
                    // src={Landlord?.imageUrl}
                    src={profilePicture}
                    alt=""
                    className="itemImg"
                  />
                  <ImageuploadSingle handleFileUpload={handleFileUpload}/>
                  {/* <Imageupload handleFileUpload={handleFileUpload}/> */}
                </>
              ) : (
                <img
                  // src={Landlord?.imageUrl}
                  src={profilePicture}
                  alt=""
                  className="itemImg"
                />
              )
            }
            <div className="details">
              <h1 className="itemTitle">{Landlord?.name}</h1>
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
                {renderFieldValue("phone", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Role:</span>
                {renderFieldValue("Role", true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;