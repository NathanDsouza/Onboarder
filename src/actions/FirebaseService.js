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

function checkIfUsernameAvailable(username){
    const usernameLower = username.toLowerCase()
    const usernamePath = `/usernames/${usernameLower}`
    const ref = firebase.database().ref(usernamePath)
    const snapshot = ref.once('value').then(snapshot => {
        return snapshot.exists();
    })
   
    return snapshot
}




async function addProfile(dispatch, firstName, lastName, username){
        
        const {currentUser} = firebase.auth();
        dispatch({type: PROFILE_CREATE});
        const taken =  await checkIfUsernameAvailable(username);
        if (!taken){
            firebase.database().ref(`/usernames/${username}`)
                    .update({uid: currentUser.uid})
                    .then(() => {
                        dispatch({type: USERNAME_SET});})
                    .catch((error) => {
                        console.log(error);                   
                    })            
        } else {
            dispatch({type: USERNAME_TAKEN, payload: "Username taken"})            
            return
        }

       
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