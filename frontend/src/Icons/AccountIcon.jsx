import "../components/Widgets/widget.scss"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const AccountIcon = ()=>{
    return (
        <AccountBalanceIcon
                className="icon"
                style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
                }}
            />
    )
}

export default AccountIcon