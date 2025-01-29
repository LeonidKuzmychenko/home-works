import {BUTTONS} from "../../constants/dashboadr.js";

// eslint-disable-next-line react/prop-types
const DashboardItem = ({status, item, index, moveTask}) =>{
    return <>
        <div className={"task"}>
        {/* eslint-disable-next-line react/prop-types */}
            {item.title}
            <div className={"button_container"}>
                {BUTTONS.get(status).map((button, bIndex) => (
                    <button key={bIndex} onClick={() => moveTask(item, index, status, button.to)}>
                        {button.name}
                    </button>
                ))}
            </div>
        </div>
    </>
}

export default DashboardItem;