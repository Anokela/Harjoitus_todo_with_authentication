import { View, Text, Button } from 'react-native'
import React from 'react'
import styles from '../style/style';

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Todos, welcome</Text>
        <Text style={styles.infoText}>For people having lots of things todo</Text>
        <View style={styles.buttonStyle}>
            <Button
                style={styles.header}
                title='Register'
                onPress={()=> navigation.navigate('Register')} />

        </View>
        <View style={styles.buttonStyle}>
            <Button
                style={styles.header}
                title='Login'
                onPress={()=> navigation.navigate('Login')} />
        </View>
    </View>
  )
}