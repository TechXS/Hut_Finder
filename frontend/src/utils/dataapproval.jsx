export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 ,valueGetter: (params) => params.row.client?.name},
    { field: "phoneNumber", headerName: "Contact", width: 120 ,valueGetter: (params) => params.row.client?.phoneNumber},
    { field: "email", headerName: "Email", width: 120 ,valueGetter: (params) => params.row.client?.email},
    { field: "property", headerName: "Property Name", width: 120 ,valueGetter: (params) => params.row.property?.name}
    // { field: "unit", headerName: "UnitType", width: 100 },
    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
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