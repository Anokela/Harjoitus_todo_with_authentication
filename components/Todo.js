import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, Button, Alert, ScrollView, Pressable } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { firebase, TODOS_REF, USERS_REF } from '../firebase/Config';
import { TodoItem } from './TodoItem';
import { logout } from './Auth';
import styles from '../style/style'

export default function Todo({navigation}) {
  let currentUserEmail = firebase.auth().currentUser.email;
  const [userKey, setUserKey] = useState('');
  const [nickname, setNickname] = useState('');  
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState({});

  useEffect(() => {
    firebase.database().ref(USERS_REF)
    .orderByChild('email')
    .equalTo(currentUserEmail)
    .on('child_added', snapshot => {
        firebase.database().ref(TODOS_REF).child(snapshot.key).on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let todoItems = {...data};
            setTodos(todoItems);
            setUserKey(snapshot.key);
            setNickname(snapshot.val().nickname);
        });
    });
  }, []);
  

  function addNewTodo() {
    if (newTodo.trim() !== "") {
        firebase.database().ref(TODOS_REF).child(userKey).push({
        done: false,
        todoItem: newTodo
      })
      setNewTodo('');
    }
  }

  function removeTodos() {
    firebase.database().ref(TODOS_REF).child(userKey).remove();
  }

  const createTwoButtonAlert = () => Alert.alert(
    "Todolist", "Remove all items?", [{
      text: "Cancel",
      onPress: () => console.log("Cancel pressed"),
      style: "cancel"
    },
    {
      text: "OK", onPress: () => removeTodos()
    }],
    { cancelable: false }
  )

    let todoKeys = Object.keys(todos);
  
  function handlePress() {
    logout();
    navigation.replace('Welcome')
  }

  return (
    <View 
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>Todolist ({todoKeys.length})</Text>
            <Pressable style={styles.logoutIcon} onPress={handlePress}>
                <MaterialIcons name='logout' size={24} color='black' />
            </Pressable>
        </View>
        <Text style={styles.infoText}>Hello, {nickname}</Text>
      <View style={styles.newItem}>
        <TextInput
          placeholder='Add new todo'
          value={newTodo}
          style={styles.textInput}
          onChangeText={setNewTodo}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Add new Todo item'
          onPress={addNewTodo}
        />
      </View>
      <ScrollView>
        {todoKeys.length > 0 ? (
          todoKeys.map(key => (
            <TodoItem
              key={key}
              id={key}
              todoItem={todos[key]}
              userKey={userKey}
            />
          ))
        ) : (
          <Text style={styles.infoText}>There are no items</Text>
        )}
        <View style={styles.buttonStyle}>
        <Button
          title='Remove all todos'
          onPress={createTwoButtonAlert}
          />
        </View>
      </ScrollView>
    </View>
  );
}
