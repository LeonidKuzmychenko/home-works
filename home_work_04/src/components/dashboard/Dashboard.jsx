import {useEffect, useState} from "react";
import "./Dashboard.scss"
import tasksRepository from "../../repositories/tasksRepository.js";
import DashboardColumn from "./DashboardColumn.jsx";

const Dashboard = () => {
    const [ticketMap, setTicketMap] = useState(new Map());

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
        if (newStatus === -1) {
            setTicketMap(map)
        } else {
            updateStatusAndSave(map, item, newStatus)
        }
    }

    return <>
        <h1 className={"title"}>Dashboard</h1>
        <div className={"dashboard"}>
            {[...ticketMap.keys()].sort((a, b) => a - b)
                .map((status) => (
                    <DashboardColumn key= {status} tickets={ticketMap.get(status)} status={status} moveTask={moveTask}/>
                ))}
        </div>
    </>
}

export default Dashboard;