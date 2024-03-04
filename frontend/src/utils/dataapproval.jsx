export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Name", width: 150 },
  { field: "contact", headerName: "Contact", width: 120 },
  { field: "unit", headerName: "UnitType", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const userRows = [
  {
    id: 1,
    username: "Keith Kareithi",
    contact: "0723944534",
    status: "pending",
    
    unit: "1 Bedroom",
  },
  {
    id: 2,
    username: "Eric Kahindi",
    contact: "0723944534",
    
    status: "pending",
    unit: "2 Bedroom",
  },
  {
    id: 3,
    username: "Samuel Wainaina",
    contact: "0723944534",
    
    status: "pending",
    unit: "# Bedroom",
  },
  
];