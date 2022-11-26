import {firebase, USERS_REF } from '../firebase/Config';
import { Alert } from 'react-native';

export async function register(nickname, email, password) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref(USERS_REF).push({
            nickname: nickname,
            email: currentUser.email
        })
    } catch (error) {
        console.log("Registration failed. ", error.message);
        Alert.alert("Registration failed", error.message);
    }
}

export async function login(email, password) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.log("Login failed. ", error.message);
        Alert.alert("Login failed", error.message);
    }
}

export async function logout() {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.log("Logout failed. ", error.message);
        Alert.alert("Logout failed", error.message);
    }
}