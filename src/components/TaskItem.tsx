import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/Feather';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ( taskId: number, taskNewTitle: string) => void
  task: Task
  index: number;
}

export function TaskItem( { toggleTaskDone, removeTask, task , index, editTask } : TaskItemProps ) {
  
  const [ isUpDating, setIsUpDating ] = useState(false)
  const [ itemEditing, setItemEditing ] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsUpDating(true)
  }

  function CancelEditing() {
    setItemEditing(task.title)
    setIsUpDating(false)
  }

  function handleSubmitEditing(){
    editTask( task.id, itemEditing )
    setIsUpDating(false)
  }

  useEffect( () => {
    if (textInputRef.current) {
      if ( isUpDating ) {
      textInputRef.current?.focus();
    }else {
      textInputRef.current?.blur()
    }}
  },[isUpDating])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={itemEditing}
            onChangeText={setItemEditing}
            editable={isUpDating}
            onSubmitEditing={handleSubmitEditing}
          >
            {task.title}
          </TextInput>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})