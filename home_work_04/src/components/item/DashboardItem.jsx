import {BUTTONS} from "../../constants/dashboadr.js";
import "./DashboardItem.scss"

// eslint-disable-next-line react/prop-types
const DashboardItem = ({status, item, index, moveTask}) =>{
    return <>
        <div className={"task"}>
        {/* eslint-disable-next-line react/prop-types */}
            {item.title}
            <div className={"button_container"}>
                {BUTTONS.get(status).map((buttonInfo, bIndex) => (
                    <button key={bIndex} onClick={() => moveTask(item, index, status, buttonInfo.to)}>
                        {buttonInfo.name}
                    </button>
                ))}
            </div>
        </div>
    </>
}

export default DashboardItem;