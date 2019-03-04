import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, CardSection, Input, Spinner, Header} from './common'
import firebase from '@firebase/app';
import '@firebase/auth'
import NavigationService from '../actions/NavigationService';


class Loading extends Component{
    componentDidMount(){
        console.log("here")
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user logged')
                NavigationService.resetNavigation('Welcome');
            } else {
                console.log('user not logged')
                NavigationService.resetNavigation('Home');
            }
         });
    }
    
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Onboarder App
                </Text> 
                <Spinner size={100}/>
            </View>
            
        )
    }

}

const styles={
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 50,
    },
}

export default Loading;