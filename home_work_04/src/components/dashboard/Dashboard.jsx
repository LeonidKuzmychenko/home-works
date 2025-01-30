import {useEffect, useState} from "react";
import "./Dashboard.scss"
import tasksRepository from "../../repositories/tasksRepository.js";
import DashboardColumn from "../column/DashboardColumn.jsx";
import {DEFAULT_COLUMNS} from "../../constants/dashboadr.js";
import DashboardForm from "../form/DashboardForm.jsx";

const Dashboard = () => {
    const [ticketMap, setTicketMap] = useState(new Map());

    useEffect(() => {
        tasksRepository.get().then(tasks => {
            const statusMap = tasks.reduce((map, item) => {
                if (!map.has(item.status)) {
                    return map;
                }
                map.get(item.status).push(item);
                return map;
            }, DEFAULT_COLUMNS);
            setTicketMap(statusMap);;
        })
    }, []);

    const copyMapWithRemoveByIndex = (status, index) => {
        const map = new Map(ticketMap);
        const newTicketList = map.get(status).filter((_, i) => i !== index);
        return map.set(status, newTicketList);
    }

    const updateStatusAndSave = (map, item, newStatus = item.status) => {
        item.status = newStatus;
        map.get(newStatus).push(item);
        setTicketMap(map);
    }

    const moveTask = (item, index, currentStatus, newStatus) => {
        const map = copyMapWithRemoveByIndex(currentStatus, index);
        if (newStatus === -1) {
            setTicketMap(map);
        } else {
            updateStatusAndSave(map, item, newStatus);
        }
    }

    const addNewTask = (item) => {
        try {
            // const savedItem = await tasksRepository.post(item);
            updateStatusAndSave(new Map(ticketMap), item);
        } catch (e) {
            console.log(e);
        }
    }

    return <>
        <h1 className={"title"}>Dashboard</h1>
        <DashboardForm addNewTask={addNewTask}/>
        <div className={"dashboard"}>
            {[...ticketMap.keys()]
                .map(status => (
                    <DashboardColumn key={status} tickets={ticketMap.get(status)} status={status} moveTask={moveTask}/>
                ))}
        </div>
    </>
}

export default Dashboard;