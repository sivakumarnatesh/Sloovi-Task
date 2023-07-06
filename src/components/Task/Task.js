/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import Images from "../../assets/Icons/Icons";
import "./Task.scss";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, DatePicker, Input, Select, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";

function Task() {
  const { Option } = Select;
  // Login API Response data
  const [token, setToken] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [userId, setUserId] = useState("");

  //Get Assigned users list
  const [assignUser, setAssignUser] = useState([]);

  //Add New Task Data
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [showDate, setShowDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState();
  const [showTime, setShowTime] = useState();
  const [assignedUserId, setAssignedUserId] = useState("");
  const [assignedName, setAssignedName] = useState("");

  //Edit Task
  const [showDelete, setShowDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskById, setTaskById] = useState({});
  const [updatedResult,setUpdatedResult] = useState({});

  const [newTask, setNewTask] = useState(false);
  const [taskList, setTaskList] = useState([]);

//   console.log("token", token);
//   console.log("companyId", companyId);
//   console.log("userId", userId);

  useEffect(() => {
    let data = JSON.stringify({
      email: "smithwills1989@gmail.com",
      password: "12345678",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://stage.api.sloovi.com/login?product=outreach",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setCompanyId(response?.data?.results?.company_id);
        setUserId(response?.data?.results?.user_id);
        setToken(response?.data?.results?.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://stage.api.sloovi.com/team?product=outreach&company_id=company_0f8d040401d14916bc2430480d7aa0f8`,
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg1NjMyMTEsIm5iZiI6MTY4ODU2MzIxMSwianRpIjoiZGM3OWIyZDctM2I5MS00YjNmLTg4YTctZTRjYzMxZDE5NjY0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.fEUJMSwX5zoxdAAQE9dZDDFrFIkK5Q76Bu5hyHI4Q0g",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.results.data));
        setAssignUser(response?.data?.results?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllTask();
  }, []);

  useEffect(() => {
    setAssignedUserId(taskById?.user_id);
    setTaskDesc(taskById?.task_msg);
    setShowDate(taskById?.task_date);
    setShowTime(taskById?.task_time);
    setAssignedName(taskById?.assigned_user_name);
  }, [taskById]);

console.log('assigned',taskById?.assigned_user_name);
  
const getAllTask = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=company_0f8d040401d14916bc2430480d7aa0f8`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg1NjMyMTEsIm5iZiI6MTY4ODU2MzIxMSwianRpIjoiZGM3OWIyZDctM2I5MS00YjNmLTg4YTctZTRjYzMxZDE5NjY0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.fEUJMSwX5zoxdAAQE9dZDDFrFIkK5Q76Bu5hyHI4Q0g",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response?.data?.results));
        setTaskList(response?.data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddTask = () => {
    setTaskById({});
    setEditMode(false);
    setNewTask(true);
    setShowDelete(false);
    setTaskDesc('');
  };
  const NewTask = () => {
    let data = JSON.stringify({
      assigned_user: assignedUserId,
      task_date: taskDate,
      task_time: taskTime,
      is_completed: 0,
      time_zone: 19800,
      task_msg: taskDesc,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=company_0f8d040401d14916bc2430480d7aa0f8`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg1NjMyMTEsIm5iZiI6MTY4ODU2MzIxMSwianRpIjoiZGM3OWIyZDctM2I5MS00YjNmLTg4YTctZTRjYzMxZDE5NjY0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.fEUJMSwX5zoxdAAQE9dZDDFrFIkK5Q76Bu5hyHI4Q0g",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getAllTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdateTask = (item) => {
    console.log("updating existing task");
    console.log("task by id", item);
    let data = JSON.stringify({
      assigned_user: item?.assigned_user,
      task_date: "2023-07-12",
      task_time: 5400,
      is_completed: 1,
      time_zone: 19800,
      task_msg: taskDesc,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${item?.id}?company_id=company_0f8d040401d14916bc2430480d7aa0f8`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg1NjMyMTEsIm5iZiI6MTY4ODU2MzIxMSwianRpIjoiZGM3OWIyZDctM2I5MS00YjNmLTg4YTctZTRjYzMxZDE5NjY0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.fEUJMSwX5zoxdAAQE9dZDDFrFIkK5Q76Bu5hyHI4Q0g",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUpdatedResult(response?.data?.results);
        getAllTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveTask = () => {
    setShowDelete(false);
    editMode ? UpdateTask(taskById) : NewTask();
    setNewTask(false);
  };

  const handleCancelTask = () => {
    setShowDelete(false);
    setNewTask(false);
    setTaskDesc('');
    setTaskDate();
    setTaskTime();
    // setAssignedName("");
  };
  const handleChangeDescription = (e) => {
    const val = e?.target?.value;
    setTaskDesc(val);
  };
  const handleChangeDate = (date, dateString) => {
    setTaskDate(date.format("YYYY-MM-DD"));
    setShowDate(date);
  };
  const handleChangeTime = (time, timeString) => {
    setShowTime(time);
    var hms = time.format("HH:mm:ss"); // your input string
    var a = hms.split(":"); // split it at the colons
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    setTaskTime(seconds);
  };
//   console.log('task list',taskList);
  const handleChangeUser = (value) => {
    // console.log('val',value);
    setAssignedUserId(value);
    // setAssignedName("");
  };
  const getTaskById = (item) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://stage.api.sloovi.com/task/${item?.lead_id}/${item?.id}?company_id=${item?.company_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg1NjMyMTEsIm5iZiI6MTY4ODU2MzIxMSwianRpIjoiZGM3OWIyZDctM2I5MS00YjNmLTg4YTctZTRjYzMxZDE5NjY0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.fEUJMSwX5zoxdAAQE9dZDDFrFIkK5Q76Bu5hyHI4Q0g",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setTaskById(response?.data?.results);
        setNewTask(true);
        setShowDelete(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ediTask = (item) => {
    setEditMode(true);
    getTaskById(item);
  };

  const deleteTaskById = () => {
    let data = JSON.stringify({});
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskById?.id}?company_id=company_0f8d040401d14916bc2430480d7aa0f8`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODg1NjMyMTEsIm5iZiI6MTY4ODU2MzIxMSwianRpIjoiZGM3OWIyZDctM2I5MS00YjNmLTg4YTctZTRjYzMxZDE5NjY0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.fEUJMSwX5zoxdAAQE9dZDDFrFIkK5Q76Bu5hyHI4Q0g",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (confirm("Are you sure you want to delete this task?")) {
          getAllTask();
          console.log(JSON.stringify(response.data));
          setNewTask(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Task">
      <div className="TaskHeader">
        <div className="TaskTitle">Test</div>
        <div className="TaskBottom">
          <div className="TaskWebsite">
            <a href="https://sloovi.com/" target="_blank">
              Sloovi.com
            </a>
          </div>
          <div className="TaskDescription">Add description,</div>
        </div>
      </div>
      <div className="AddTask" >
        <div>
          TASKS <span className="Counter">{taskList.length}</span>
        </div>
        <div className="AddIcon">
          <PlusOutlined onClick={AddTask} />
        </div>
      </div>
      {newTask && (
        <div className="content">
          <div>
            <div className="DescField">Task Description</div>
            <Input
              type="text"
              placeholder="Task Description"
              onChange={handleChangeDescription}
              value={taskDesc}
            />
          </div>
          <div className="Picker">
            <div className="DateField">
              <div className="DescField">Date</div>
              <DatePicker
                format="DD-MM-YYYY"
                onChange={handleChangeDate}
                value={dayjs(showDate)}
              />
            </div>
            <div className="TimeField">
              <div className="DescField">Time</div>
              <TimePicker
                use12Hours
                onChange={handleChangeTime}
                value={dayjs(showTime)}
              />
            </div>
          </div>
          <div>
            <div className="AssignField">
              <div className="DescField">Assign User</div>
              <Select
                size="middle"
                placeholder="Assign user"
                onChange={handleChangeUser}
                defaultValue={taskById?.assigned_user_name}
                style={{ width: "100%" }}
          
              >
                {assignUser?.length > 0 &&
                  assignUser.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
          <div className="ButtonContainer">
            <div className="DeleteIcon">
              {showDelete ? <DeleteOutlined onClick={deleteTaskById} /> : ""}
            </div>
            <div>
              <Button type="text" onClick={handleCancelTask}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleSaveTask}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      {!newTask && Object.keys(updatedResult).length === 0 &&
        taskList.length > 0 &&
        taskList.map((item) => {
          return (
            <div className="Tasks">
              <div className="TaskDetails">
                <div>
                  <Avatar
                    style={{
                      verticalAlign: "middle",
                      backgroundColor: "#5A99E3",
                    }}
                    size="large"
                  ></Avatar>
                </div>
                <div className="AssignDetails">
                  <div className="AssignName">{item?.task_msg}</div>
                  <div className="AssignDate">{item?.task_date}</div>
                </div>
              </div>
              <div className="TaskIcons">
                <img
                  src={Images.Edit}
                  alt="edit"
                  onClick={() => ediTask(item)}
                />
                <img src={Images.Notify} alt="notify" />
                <img src={Images.Ok} alt="ok" />
              </div>
            </div>
          );
        })}
        {/* {console.log('updated',Object.keys(updatedResult).length)} */}
        {Object.keys(updatedResult).length > 0 &&
         <div className="Tasks">
         <div className="TaskDetails">
           <div>
             <Avatar
               style={{
                 verticalAlign: "middle",
                 backgroundColor: "#5A99E3",
               }}
               size="large"
             ></Avatar>
           </div>
           <div className="AssignDetails">
             <div className="AssignName">{updatedResult?.task_msg}</div>
             <div className="AssignDate">{updatedResult?.task_date}</div>
           </div>
         </div>
         <div className="TaskIcons">
           <img
             src={Images.Edit}
             alt="edit"
             onClick={() => ediTask(updatedResult)}
           />
           <img src={Images.Notify} alt="notify" />
           <img src={Images.Ok} alt="ok" />
         </div>
       </div>

        } 
    </div>
  );
}

export default Task;
