export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "User",
      width: 150,
    },
  
    {
      field: "phoneNumber",
      headerName: "Contact",
      width: 120,
    },
  
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "_id",
      headerName: "Unit No.",
      width: 250,
      valueGetter: (params) => params.row.unit?._id || "N/A",
    },
    {
      field: "isVerified",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            {params.row.isVerified ? (
              <div className={`cellWithStatus paid`}>paid</div>
            ) : (
              <div className={`cellWithStatus pending`}>pending</div>
            )}
          </>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Zendeya Chloe",
      contact: "0723944534",
      status: "paid",
      email: "chloe@gmail.com",
      unit: "A5",
    },
    {
      id: 2,
      username: "Eric Kahindi",
      contact: "0723944534",
      email: "kaz@gmail.com",
      status: "paid",
      unit: "C9",
    },
    {
      id: 3,
      username: "Samuel Wainaina",
      contact: "0723944534",
      email: "sam@gmail.com",
      status: "pending",
      unit: "B7",
    },
    {
      id: 4,
      username: "Keith Kareithi",
      contact: "0723944534",
      email: "keith@gmail.com",
      status: "paid",
      unit: "D2",
    },
    {
      id: 5,
      username: "Samuel Wainaina",
      contact: "0723944534",
      email: "sam@gmail.com",
      status: "pending",
      unit: "F8",
    },
    {
      id: 6,
      username: "Maxwell Chanzu",
      contact: "0723944534",
      email: "max@gmail.com",
      status: "paid",
      unit: "G3",
    },
    {
      id: 7,
      username: "Clifford Matata",
      contact: "0723944534",
      email: "cliff@gmail.com",
      status: "paid",
      unit: "H1",
    },
    {
      id: 8,
      username: "Ivy Armah",
      contact: "0723944534",
      email: "ivy@gmail.com",
      status: "pending",
      unit: "E4",
    },
    {
      id: 9,
      username: "Nelson Mandela",
      contact: "0723944534",
      email: "nelson@gmail.com",
      status: "pending",
      unit: "C10",
    },
    {
      id: 10,
      username: "Shanelle Laura",
      contact: "0723944534",
      email: "laura@gmail.com",
      status: "paid",
      unit: "G7",
    },
  ];