import {FORM_STATUSES} from "../../constants/dashboadr.js";
import {useRef, useState} from "react";
import "./DashboardForm.scss"

// eslint-disable-next-line react/prop-types
const DashboardForm = ({addNewTask}) => {
    const [selectedStatus, setSelectedStatus] = useState(0);
    const titleRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const item = {
            title: titleRef.current.value,
            status: selectedStatus
        }
        addNewTask(item)
    }

    return <>
        <form className={"form"} onSubmit={handleFormSubmit}>
            <label className={"inputTitle"}>title: <input type={"name"} ref={titleRef}/></label>
            <div className={"checkboxContainer"}>
                {FORM_STATUSES.map(item => (
                    <label key={item.status}>
                        <input type={"checkbox"}
                               checked={selectedStatus === item.status}
                               onChange={() => setSelectedStatus(item.status)}/>
                        {item.name}
                    </label>
                ))}
            </div>
            <div className={"buttonContainer"}>
                <button type={"submit"} className={"buttonSubmit"}>Add task</button>
            </div>

        </form>
    </>
}

export default DashboardForm;