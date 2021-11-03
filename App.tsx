import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  let [tsk, setTsk] = useState<string | undefined>()
  let [taskList, setTaskList] = useState<Array<string>>([])


  async function addTask(value: string | undefined) {

    if (!value) {
      return;
    }

    Keyboard.dismiss()
    setTaskList([...taskList, value])
    // setTsk(undefined)


    let obj = {
      tasks: []
    }

    const item = await AsyncStorage.getItem('tasks')

    if (!item) {

      obj.tasks.push(value)
      obj = JSON.stringify(obj)
      await AsyncStorage.setItem('tasks', obj)
      // console.log(await AsyncStorage.getItem('tasks'))

    } else {

      let oj = JSON.parse(item)
      oj.tasks.push(value)
      oj = JSON.stringify(oj)
      await AsyncStorage.setItem('tasks', oj)
      // console.log(await AsyncStorage.getItem('tasks'))
    }

    setTsk(undefined)

  }

  async function completeTask(index: any) {
    let itemsCopy = [...taskList]
    itemsCopy.splice(index, 1)
    setTaskList(itemsCopy)

    const item = await AsyncStorage.getItem('tasks')

    let obj = JSON.parse(item)
    obj.tasks.splice(index, 1)

    let json = JSON.stringify(obj)
    await AsyncStorage.setItem('tasks', json)
  }

  async function setItems() {

    let item = await AsyncStorage.getItem('tasks')

    let v = JSON.parse(item)

    if (v) {

      return (v)

    } else return
  }

  async function callback() {
    let i = await setItems()

    setTaskList([...i.tasks])
  }

  useEffect(callback, [])


  return (
    <View style={styles.container}>

      <View style={styles.topWrapper}>
        <Text style={styles.task}>Today's Tasks</Text>
        <ScrollView style={styles.taskList}>
          {
            taskList.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => completeTask(index)}>
                  <Task key={index} text={item} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>


      <KeyboardAvoidingView
        style={styles.viewTaskContainer}
        behavior={Platform.OS == "ios" ? "padding" : 'height'}
      >
        <TextInput style={styles.input} placeholder={"Write a task"} value={tsk} onChangeText={text => setTsk(text)} />
        <TouchableOpacity onPress={() => addTask(tsk)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  topWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  task: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20
  },
  taskList: {
    padding: 5
  },
  viewTaskContainer: {
    position: 'absolute',
    width: "100%",
    bottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  input: {
    paddingHorizontal: 15,
    width: 250,
    borderRadius: 60,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5
  },
  button: {
    color: 'lightgrey',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: 60,
    height: 60,
    borderRadius: 80,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  }
});
