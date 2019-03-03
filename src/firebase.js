import firebase from '@firebase/app';

const config = {
    apiKey: "AIzaSyADjyrB_qd91t4Tf1p4o8oHhRa3DpjTWns",
    authDomain: "onboarder-66903.firebaseapp.com",
    databaseURL: "https://onboarder-66903.firebaseio.com",
    projectId: "onboarder-66903",
    storageBucket: "onboarder-66903.appspot.com",
    messagingSenderId: "671225463680"
};
const firebaseSetup = firebase.initializeApp(config);
export default firebaseSetup;
