import firebase from '@firebase/app';
import  '@firebase/database';
import '@firebase/auth';
import NavigationService from './NavigationService';

import {
    CREATE_ROOM,
    PROFILE_CREATE,
    USERNAME_SET,
    USERNAME_TAKEN,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL
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




export async function addProfile(dispatch, firstName, lastName, username){
        
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

export async function joinRoom(dispatch, roomId){
    const {currentUser} = firebase.auth();
    const updateRoom = {};
    //need to grab room data
    //need to check if room exists
    //need to have user object somewhere to access easily
    updateRoom[currentUser.uid]= {
        stack: 500,
    }
    firebase.database().ref(`/rooms/${roomId}/members`).update(updateRoom)
    .then(() => {
        console.log("success")
        NavigationService.resetNavigation('Room');
      })
      .catch((error) => {
          console.log("fail")
      })
}

export async function addRoom(dispatch, stack, blind){
    
    roomId = '1234'
    console.log("oh hi mark ", blind, stack)
    const {currentUser} = firebase.auth();
    const updateRoom = {};
    //updateRoom["1234/members"] = {uid: currentUser.uid}
    updateRoom[roomId] = {
        bigBlind: blind,
        startingStack: stack,
        host: currentUser.uid,
    };
    
    
    console.log(updateRoom)

    dispatch({type: CREATE_ROOM});

    firebase.database().ref(`/rooms/`)
            .update(updateRoom)
            .then(() => {
              console.log("success")
              NavigationService.resetNavigation('Room');
            })
            .catch((error) => {
                console.log("fail")
            })
    joinRoom(dispatch, roomId)
    
}


