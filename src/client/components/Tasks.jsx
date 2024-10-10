import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ description: '', status: 'pending' })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/tasks', newTask)
      setNewTask({ description: '', status: 'pending' })
      fetchTasks()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/tasks/${id}`, { status: newStatus })
      fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <div>
      <h2>Tareas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Descripción de la tarea"
          required
        />
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description} - {task.status}
            <button onClick={() => handleStatusChange(task.id, 'completed')}>Completar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks