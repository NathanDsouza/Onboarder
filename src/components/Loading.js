import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Card, CardSection, Input, Spinner, Button} from './common'
import firebase from '@firebase/app';
import '@firebase/auth'
import NavigationService from '../actions/NavigationService';


class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = { screen: 'LandingScreen' };
    }

    componentDidMount(){
        console.log("here")
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user logged')
                this.state.screen = 'Welcome';
            } else {
                console.log('user not logged')
                this.state.screen = 'LandingScreen';
            }
         });
    }
    
    componentWillUnmount(){
        this.unsubscribe();
    }

    _onButtonPress(){
        NavigationService.resetNavigation(this.state.screen); 
    }

    static navigationOptions = {
        title: 'Poker Pals',
        headerTitleStyle: {textAlign:"center", flex:1 },
      };
    render(){
        return(
            <View style={styles.container}>
                 
                <Image source={require('../images/logo.png')} />
                <Button onPress={this._onButtonPress.bind(this)}>  
                    Begin
                </Button>    
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