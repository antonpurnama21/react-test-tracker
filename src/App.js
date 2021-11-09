import { useState, useEffect } from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  
  // task list
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTask()
  }, [])

  /**
   * Fetch Tasks
   * @returns {json}
   */
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    // console.log(data)
    return data
  }

  /**
   * Fetch Tasks by id
   * @param {integer} id | task id
   * @returns {json}
   */
   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    return data
  }

  /**
   * 
   * @param {integer} id | task id
   */
  const deleteTask = async (id) => {
    // console.log('delete', id)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter( (task) => task.id !== id))
  }

  /**
   * 
   * @param {object} task | object new task 
   */
   const addTask = async (task) => {
    console.log(task)
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {...task, id}
    // console.log(newTask)
    // setTasks([...tasks, newTask])
  }

  /**
   * 
   * @param {integer} id | task id
   */
  const toggleReminder = async (id) => {
    // console.log(id)
    const taskToToggle = await fetchTask(id)
    const updataToogle = {...taskToToggle, reminder : !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updataToogle)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <div className="container">
      <Header onAdd={ () => setShowAddTask(!showAddTask) }  onShow={ showAddTask }/>
      {showAddTask && <AddTask onAdd={ addTask } />}
      { tasks.length > 0 ? <Tasks tasks={ tasks } onDelete={ deleteTask } onToggle={ toggleReminder } /> : 'No Task To show'}
      <Footer />
    </div>
  );
}

/**
 * Class example
 */
// class App extends React.Component {
//   render() {
//     return <h1>Hello From React</h1>
//   }
// }

export default App;
