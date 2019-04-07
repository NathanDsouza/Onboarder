import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {createRoom} from '../actions';

class Room extends Component{

    render(){
        return(
            <Card>
               <Text>
                   ROOM 
               </Text>
            </Card>
        );
    }
}

const styles ={
}

export default Room