import {useEffect, useState} from "react";
import "./Dashboard.scss"
import tasksRepository from "../../repositories/tasksRepository.js";

const Dashboard = () => {
    const [ticketMap, setTicketMap] = useState(new Map());
    const statuses = {0: ["To do"], 1: ["In progress"], 2: ["Done"]};
    useEffect(() => {
        tasksRepository.get().then(tasks => {
            const statusMap = tasks.reduce((map, item) => {
                map.get(item.status).push(item);
                return map;
            }, new Map([[0, []], [1, []], [2, []]]));
            setTicketMap(statusMap)
        })
    }, []);

    const copyMapWithRemoveByIndex = (status, index) => {
        const map = new Map(ticketMap)
        const newTicketList = map.get(status).filter((_, i) => i !== index);
        return map.set(status, newTicketList)
    }

    const updateStatusAndSave = (map, item, status) => {
        item.status = status
        map.get(status).push(item)
        setTicketMap(map)
    }

    const moveTask = (item, index, currentStatus, newStatus) => {
        const map = copyMapWithRemoveByIndex(currentStatus, index)
        updateStatusAndSave(map, item, newStatus)
    }

    const removeTask = (item, index) => {
        const map = copyMapWithRemoveByIndex(2, index)
        setTicketMap(map)
    }

    //сначала сделал через классы, но так получается оптимизированней, ведь нет лишних проверок
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
        return <button onClick={() => removeTask(item, index)}>To archive</button>
    }

    return <>
        <h1 className={"title"}>Dashboard</h1>
        <div className={"dashboard"}>
            {[...ticketMap.keys()].sort((a, b) => a - b)
                .map((status) => (
                    <div className={"column"} key={status}>
                        <h2 className={"column_title"}>{statuses[status]}: {ticketMap.get(status).length}</h2>
                        {ticketMap.get(status).map((item, index) => (
                            <div className={"task"} key={item.id}>
                                {item.title}
                                <div className={"button_container"}>
                                    {renderButtons(item, status, index)}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    </>
}

export default Dashboard;