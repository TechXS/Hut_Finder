import "./approval.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../utils/dataapproval.jsx";
import { useEffect, useState } from "react";
import {selectLandlordData} from "../../stores/landlordSlice.js"
import {useSelector} from "react-redux";

const Datatable = () => {

    const {appointments} = useSelector(selectLandlordData)

    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        const numRows = userRows.length;
        const maxPageSize = 5;
        const calculatedPageSize = Math.min(numRows, maxPageSize);
        setPageSize(calculatedPageSize);
    }, []);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <div className="approveButton">Approve</div>
                        <div className="declineButton">Decline</div>
                    </div>
                );
            },
        },
    ];

    const tableHeight = pageSize * 52; // Assuming row height of 52px

    return (
        <div className="datatable">
            <div className="databaseTitle">Appointment Approval Database</div>
            { appointments ? (
                <div style={{ height: `${tableHeight}px`, width: "100%" }}>
                    <DataGrid
                        rows={appointments}
                        getRowId={(row) => row._id}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={pageSize}
                        pageSizeOptions={[5]}
                        checkboxSelection
                    />
                </div>
            ) :
                (<div>No appointments Available</div>)}
        </div>
    );
};

export default Datatable;