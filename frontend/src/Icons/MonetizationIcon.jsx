import "../components/Widgets/widget.scss"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const MonetizationIcon = ()=>{
    return (
        <MonetizationOnIcon
                className="icon"
                style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
                }}
            />
    )
}

export default MonetizationIcon