import { ChangeEvent } from 'react'
import { TasksListProps } from '../App'

import { Trash } from 'phosphor-react'
import { Check } from 'phosphor-react'

import styles from './TasksList.module.css'

interface TasksProps {
  tasks: TasksListProps,
  onDeleteTask: (id: string) => void,
  onDoneTask: (id: string, isDone: boolean) => void
}

export function TasksList({ tasks, onDeleteTask, onDoneTask }: TasksProps) {

  function handleDeleteTask() {
    onDeleteTask(tasks.id)
  }

  function handleCheckTask(event: ChangeEvent<HTMLInputElement>) {
    onDoneTask(tasks.id, event.target.checked)
  }
  
  return (
    <div className={styles.taskContainer}>
      <label>
        <div className={styles.wrapper}>
          <input 
            type="checkbox"
            onChange={handleCheckTask}
          />
          <span>{tasks.content}</span>
        </div>
      </label>
      <div>
        <Trash 
          size={18} 
          color="#808080"  
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  )
}