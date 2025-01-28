import STATUSES from '../../constants/dashboadr.js'

// eslint-disable-next-line react/prop-types
const DashboardColumn = ({tickets, status, moveTask}) => {
    const renderButtons = (item, status, index) => {
        if (status === 0) {
            return <button onClick={() => moveTask(item, index, 0, 1)}>In progress</button>
        }
        if (status === 1) {
            return <>
                <button onClick={() => moveTask(item, index, 1, 0)}>To do</button>
                <button onClick={() => moveTask(item, index, 1, 2)}>Done</button>
            </>
        }
        return <button onClick={() => moveTask(item, index, 2, -1)}>To archive</button>
    }

    return <>
        <div className={"column"}>
            {/* eslint-disable-next-line react/prop-types */}
            <h2 className={"column_title"}>{STATUSES[status]}: {tickets.length}</h2>
            {/* eslint-disable-next-line react/prop-types */}
            {tickets.map((item, index) => (
                <div className={"task"} key={item.id}>
                    {item.title}
                    <div className={"button_container"}>
                        {renderButtons(item, status, index)}
                    </div>
                </div>
            ))}
        </div>
    </>
}

export default DashboardColumn;