import React, { useState } from "react";
import "./History.css";
import ItemHistory from "../../components/ItemHistory";

import { getHistory } from '../../services/TaskHistoryService'
import { useEffect } from "react";
import Header from "../../Layout/Header/Header";

const History = () => {


    //tasks
    const [tasks, setTasks] = useState('null');

    const data = async () => {
        setTasks(await getHistory());
    }

    useEffect(() => {
        if (tasks == "null") {
            data();
        }
    },[])

    return (
        <div className="full">
            <Header />
            <div className="content">
                <h1>היסטוריה</h1>
                <div className="tasks">
                    {'' || Object.keys(tasks).map((keyName) => (
                            <ItemHistory key={keyName} name={tasks[keyName].name}
                                content={tasks[keyName].content}
                                date={tasks[keyName].date}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default History;
