import firebase from 'firebase/compat';
import 'firebase/auth';

export const firebaseConfig = ({
    apiKey: "AIzaSyBW8opDxIItlqvejlR7LNoUel5VXy3E5kk",
    authDomain: "todo-with-authentication-7df5d.firebaseapp.com",
    databaseURL: "https://todo-with-authentication-7df5d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-with-authentication-7df5d",
    storageBucket: "todo-with-authentication-7df5d.appspot.com",
    messagingSenderId: "1022484213871",
    appId: "1:1022484213871:web:c92f3b5264ab5e09b31d9a",
    databaseURL: "https://todo-with-authentication-7df5d-default-rtdb.europe-west1.firebasedatabase.app/"
});

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export { firebase };
export const TODOS_REF = '/todos/';
export const USERS_REF = '/users/';