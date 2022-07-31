import axios from "axios";

const endPoint = "http://localhost:8000/todo";

async function getTasks() {
  try {
    const res = await axios.get(endPoint);
    return res.data;
  } catch (err) {
    console.error(`An error occured: ${err}`);
    return [];
  }
}

async function addTask(text) {
  const data = { text };
  try {
    const res = await axios.post(endPoint, { data });
    return res.data;
  } catch (err) {
    console.error(`An error occured: ${err}`);
  }
}

async function deleteTask(taskId) {
  try {
    const res = await axios.delete(`${endPoint}/${taskId}`);
    return res.data;
  } catch (err) {
    console.error(`An error occured: ${err}`);
  }
}

async function clearAll() {
  try {
    const res = await axios.delete(`${endPoint}/all`);
    return res.data;
  } catch (err) {
    console.error(`An error occured: ${err}`);
  }
}

async function toggleTaskStatus(taskId, newCheckedStatus) {
  try {
    const data = { checked: newCheckedStatus };
    const res = await axios.patch(`${endPoint}/${taskId}`, { data });
    return res.data;
  } catch (err) {
    console.error(`An error occured: ${err}`);
  }
}

export { toggleTaskStatus, clearAll, deleteTask, addTask, getTasks };
