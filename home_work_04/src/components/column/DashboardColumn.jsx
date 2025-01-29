import {STATUSES} from '../../constants/dashboadr.js'
import DashboardItem from "../item/DashboardItem.jsx";
import "./DashboardColumn.scss"

// eslint-disable-next-line react/prop-types
const DashboardColumn = ({tickets, status, moveTask}) => {
    return <>
        <div className={"column"}>
            {/* eslint-disable-next-line react/prop-types */}
            <h2 className={"column_title"}>{STATUSES.get(status)}: {tickets.length}</h2>
            {/* eslint-disable-next-line react/prop-types */}
            {tickets.map((item, index) => (
                <DashboardItem key={index} item={item} status={status} index={index} moveTask={moveTask}/>
            ))}
        </div>
    </>
}

export default DashboardColumn;