import { useState } from 'react';
import "./profile.scss";
//import MuiAlert from '@mui/material/Alert';
//import CustomizedSnackbars from '../Alerts/SnackBar';

//import wishItemList from '../Wishlist/wishlist';
import { wishlistItems } from '../../utils/dataUtil';
import SearchItemList from '../SearchItem/SearchItem';
import StickyHeadTable from '../table/ClientAppointments';
import { clientAppointmentsData } from '../../utils/dataUtil';

const ProfileClient = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [savedFields, setSavedFields] = useState({
    email: "natalie@gmail.com",
    phone: "0712847343",
    address: "Mwabe St. 24 Garden City. Nairobi",
    Role: "Tenant",
    propertyName:"Cascade Apartments",
    unitType:"2 Bedroom",
    houseNumber:"C9",
    landLord: "J.M.Kariuki",
    
  });

  const handleEditClick = () => {
    if (isEditing) {
      if (validateFields(editedFields)) {
        setSavedFields(prevFields => ({ ...prevFields, ...editedFields }));
      } else {
        alert('Please fill in all the fields with valid values.');
        return;
      }
    }
    setIsEditing(!isEditing);
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
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">Natalie Halle</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                {renderFieldValue("email", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                {renderFieldValue("phone", true)}
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                {renderFieldValue("address", true)}
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