import {useEffect, useState} from "react";
import './List.scss'

const List = () => {

    //так инитить норм?
    let [animals, setAnimals] = useState([
        {type: `turtle`, icon: `🐢`},
        {type: `octopus`, icon: `🐙`},
        {type: `fish`, icon: `🐠`},
        {type: `flamingo`, icon: `🦩`},
        {type: `penguin`, icon: `🐧`}
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(new Date())
            setAnimals((prevState) => {
                const inactiveItems = prevState.filter(item => !item.active);
                const randomItem = inactiveItems[Math.floor(Math.random() * inactiveItems.length)];
                if (inactiveItems.length === 1) {
                    clearInterval(interval);
                }
                return prevState.map(item => item === randomItem ? {...item, active: true} : item);
            })
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    //в данной реализации избыточно, но способ мне понравился, возьму на заметку ;)
    const getClassName = (item) => {
        const classes = [];
        item.active ? classes.push('active') : null;
        return classes.join(' ');
    };

    return (
        <table id={"animalTable"}>
            <thead>
            <tr>
                <th>Type</th>
                <th>Icon</th>
            </tr>
            </thead>
            <tbody>
            {animals.map((item, index) => (
                <tr key={index}>
                    <td className={getClassName(item)}>{item.type}</td>
                    <td>{item.icon}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default List;