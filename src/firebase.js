import firebase from '@firebase/app';

const config = {
    apiKey: "AIzaSyCl2COl6abX3YRLVR6oYL5eDsiu_yh-UFs",
    authDomain: "onboarder-a3f6b.firebaseapp.com",
    databaseURL: "https://onboarder-a3f6b.firebaseio.com",
    projectId: "onboarder-a3f6b",
    storageBucket: "onboarder-a3f6b.appspot.com",
    messagingSenderId: "948598914932"
};
const firebaseSetup = firebase.initializeApp(config);
export default firebaseSetup;
