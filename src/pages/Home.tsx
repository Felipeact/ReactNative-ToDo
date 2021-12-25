import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newToDoTitle = tasks.find( newTitle => newTitle.title === newTaskTitle)
    if(newToDoTitle){
      return Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false

    }
    setTasks(oldTask => [...oldTask, data])
  } 

  function handleEditTask( taskId: number, taskNewTitle: string ){
    const updatedTasks = tasks.map(task => ({...task}))

    const foundItem = updatedTasks.find( item => item.id === taskId)

    if( !foundItem ) return
 
    const data = {
      id: foundItem.id,
      title: taskNewTitle,
      done: foundItem.done
    }
    setTasks([...updatedTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))

    const foundItem = updatedTasks.find( item => item.id === id)

    if( !foundItem ) return

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
   
  }

  function handleRemoveTask(id: number) {
     
    Alert.alert('Remover item','Tem certeza que você deseja remover esse item?', [{

      style: 'cancel',
      text: 'Nao',



    },{
      style: 'destructive',
      text: 'sim',
      onPress: () => {
        setTasks( oldTask => oldTask.filter(
          task => task.id !== id
        ))
      }
    }])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})