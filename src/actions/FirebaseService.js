import firebase from '@firebase/app';
import  '@firebase/database';
import '@firebase/auth'
import NavigationService from './NavigationService';


import {
    FIRST_NAME_CHANGED,
    LAST_NAME_CHANGED,
    USERNAME_CHANGED,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL,
    PROFILE_CREATE,
    USERNAME_AVAILABLE,
    USERNAME_SET,
    USERNAME_TAKEN
} from './types'

async function checkIfUsernameAvailable(username){
    const usernameLower = username.toLowerCase()
    const usernamePath = `/usernames/${usernameLower}`
    const ref = firebase.database().ref(usernamePath)
    console.log("ref", ref)
    const snapshot = await ref.once('value').then(snapshot => {
        return snapshot.val();
    })
    console.log("snapshot", snapshot)
    // const taken = await firebase.database().ref(`/usernames`)
    // .equalTo(usernameLower)
   
    // console.log(taken)
    return false
}




function addProfile(dispatch, firstName, lastName, username){
    
        dispatch({type: PROFILE_CREATE});
        const taken =  checkIfUsernameAvailable(username);
        console.log('hey ', taken)
        if (!taken){
            firebase.database().ref(`/usernames`)
                    .update({username})
                    .then(() => {
                        dispatch({type: USERNAME_SET});})
                    .catch((error) => {
                        console.log(error);                   
                    })            
        } else {
            dispatch({type: USERNAME_TAKEN, payload: "Username taken"})            
            return
        }

        const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
        .update({firstName, lastName, username})
        .then(() => {
            dispatch({type: PROFILE_CREATE_SUCCESS});
            NavigationService.resetNavigation('Welcome');
        })
        .catch((error) => {
            console.log("error is ", error)
            dispatch({type: PROFILE_CREATE_FAIL, payload: error.toString() });
        })

       
    
  
}
export default {
    addProfile
  };