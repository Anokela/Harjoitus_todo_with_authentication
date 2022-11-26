import { View, ActivityIndicator } from 'react-native';
import { firebase } from '../firebase/Config';
import React, {useEffect} from 'react';
import styles from '../style/style';

export default function Loading({navigation}) {
    
  useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
          if(user) {
              navigation.replace('Todo');
          } else {
              navigation.replace("Welcome");
          }
      }); 
    }, []);
    
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}