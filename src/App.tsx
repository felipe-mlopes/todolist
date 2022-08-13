import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { TasksList } from './components/TaksList'
import { EmptyList } from './components/EmptyList'

import { PlusCircle } from 'phosphor-react'

import './global.css'
import Logo from './assets/rocket.svg'
import styles from './App.module.css'

export interface TasksListProps {
    id: string,
    content: string,
    isDone: boolean
  }

export function App() {
  const [tasks, setTasks] = useState<TasksListProps[]>([])
  const [newTaskText, setnewTaskText] = useState('')
  const tasksCompletedFrequency = tasks.filter(item => item.isDone === true)

  function handleAddTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      isDone: false
    }

    setTasks([...tasks, newTask])
    setnewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setnewTaskText(event.target.value)
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithOutDeleteOn = tasks.filter(item => {
      return item.id !== taskToDelete
    })

    setTasks(tasksWithOutDeleteOn)
  }

  function checkTask(taskToCheck: string) {
    tasks.map(item => {
      if(item.id === taskToCheck && item.isDone === false) {
        return item.isDone = true
      } if(item.id === taskToCheck && item.isDone === true) {
        return item.isDone = false
      }
    })
    
    setTasks([...tasks])
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={Logo} alt="logotipo" />
          <h1>
            <span>to</span>
            <span>do</span>
          </h1>
        </div>
      </header>
      <main className={styles.main}>
      <form 
        className={styles.form}
        onSubmit={handleAddTask}
      >
        <input 
          name='content'
          type="text"
          placeholder='Adicione uma nova tarefa'
          value={newTaskText}
          onChange={handleNewTaskChange}
        />
        <button>
          <span>Criar</span>
          <PlusCircle size={16} />
        </button>
      </form>
        <div className={styles.container}>
          <header className={styles.containerHeader}>
            <div>
              <strong className={styles.taskCreated}>Tarefas Criadas</strong>
              <span>{tasks.length}</span>
            </div>
            <div>
              <strong className={styles.taskDone}>Concluídas</strong>
              <span>{tasks.length === 0 ? '0' : `${tasksCompletedFrequency.length} de ${tasks.length}`}</span>
            </div>
          </header>
          {tasks.length === 0 ? <EmptyList /> : tasks.map(item => {
            return (
              <TasksList 
                key={item.id}
                tasks={item}
                onDeleteTask={deleteTask}
                onDoneTask={checkTask}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
