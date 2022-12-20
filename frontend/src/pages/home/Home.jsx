import React, { useState } from "react";
import "./Home.css";
import Item from "../../components/Item";
import ItemDone from "../../components/ItemDone";
import Popup from "../../components/Popup";
import PopupRemove from "../../components/PopupRemove";
import Add from "../../components/Add";

import { getUserByJWT, getUserDoneByJWT } from '../../services/TaskService'
import { useEffect } from "react";
import Header from "../../Layout/Header/Header";

const Home = () => {

  //popup
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);

  //add popup
  const [add, setAdd] = useState(false);

  //tasks
  const [task, setTask] = useState('null');
  const [tasks, setTasks] = useState('null');
  const [tasksDone, setTasksDone] = useState('null');

  const data = async () => {
    setTasks(await getUserByJWT());
    setTasksDone(await getUserDoneByJWT());
    console.log('tasks')
  }

  const addTask = async () => {
    setTasks(await getUserByJWT());
    console.log('add')
  }

  useEffect(() => {
    if (localStorage.getItem('token') == undefined) {
      window.location = '/login';
    }
    if (tasks == "null") {
      data();
    }
  }, [])

  return (
    <div className="full">
      <Header />
      <div className="content">
        {isOpen && <Popup
          name={task.name}
          content={task.content}
          id={task._id}
          setIsOpen={setIsOpen}
          data={data}
        />}
        {isOpenRemove && <PopupRemove
          name={task.name}
          content={task.content}
          id={task._id}
          setIsOpenRemove={setIsOpenRemove}
          data={data}
        />}
        {add && <Add
          name={task.name}
          content={task.content}
          id={task._id}
          setAdd={setAdd}
          addTask={addTask}
          
        />}
        <div className="card">שיהיה לך יום יפה כמעט כמוך</div>
        <h1>משימות להיום</h1>
        <div className="tasks">
          {'' || Object.keys(tasks).map((keyName) => (
            <div onClick={() => { setTask(tasks[keyName]); setIsOpen(true) }}>
              <Item key={keyName} name={tasks[keyName].name}
                content={tasks[keyName].content}

              />
            </div>
          ))}
          <Item name="גרסה משופרת"
            content="לסיים את היום בלהיות גרסה משופרת של אתמול"
          />
        </div>
        <h1>משימות שבוצעו</h1>
        <div className="tasks">
          {'' || Object.keys(tasksDone).map((keyName) => (
            <div onClick={() => { setTask(tasksDone[keyName]); setIsOpenRemove(true) }}>
              <ItemDone key={keyName} name={tasksDone[keyName].name}
                content={tasksDone[keyName].content} 
              />
            </div>
          ))}
          <ItemDone name="אנרגיה"
            content="לקום בבוקר עם חיוך ותחושה טובה"
          />
        </div>
      </div>
      <div className="big">
        <div className="add-btn" onClick={() => { setAdd(true) }}>
          הוסף משימה
        </div>
      </div>
    </div>
  );
}

export default Home;
