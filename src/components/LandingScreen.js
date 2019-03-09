import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Card, CardSection, Input, Spinner, Button} from './common'
import firebase from '@firebase/app';
import '@firebase/auth'
import NavigationService from '../actions/NavigationService';


class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = { screen: 'AuthSelection' };
    }

    componentDidMount(){
        console.log("here")
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user logged')
                this.state.screen = 'Welcome';
            } else {
                console.log('user not logged')
                this.state.screen = 'AuthSelection';
            }
         });
    }
    
    componentWillUnmount(){
        this.unsubscribe();
    }

    _onButtonPress(){
        NavigationService.navigate(this.state.screen); 
    }

    static navigationOptions = {
        title: 'Poker Pals',
        headerTitleStyle: {textAlign:"center", flex:1 },
      };
    render(){
        return(
            <View style={styles.container}>
                 
                <Image 
                    source={require('../images/chip.png')} 
                    style={{width: 200, height: 200}}
                />
                <TouchableOpacity style={styles.buttonStyle} onPress={this._onButtonPress.bind(this)}>  
                   <Text style={styles.buttonTextStyle}>
                       Begin
                   </Text>
                </TouchableOpacity>    
            </View>
            
        )
    }

}

const styles={
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 50,
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      },
      buttonStyle: {
        marginTop: 100,
        elevation: 10,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
      }
}

export default Loading;