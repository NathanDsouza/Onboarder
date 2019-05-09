import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import { startRoomListener } from '../actions'

class Room extends Component{

    componentDidMount(){
        console.log("room my dude")
        this.props.startRoomListener()
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Text  style={{fontWeight: "bold"}} >
                        RoomId: 
                    </Text>
                    <Text>
                       {this.props.roomId}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text  style={{fontWeight: "bold"}} >
                        Blind: 
                    </Text>
                    <Text>
                       {this.props.blind}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text  style={{fontWeight: "bold"}} >
                        Stack: 
                    </Text>
                    <Text>
                      {this.props.stack}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text  style={{fontWeight: "bold"}} >
                        Pot: 
                    </Text>
                    <Text>
                      {this.props.pot}
                    </Text>
                </CardSection>
               
            </Card>
        );
    }
}

const styles ={
}


const mapStateToProps = ({room}) => {
    const {blind, pot, members, roomId, stack} = room;

    return{blind, pot, members, roomId, stack};
};

export default connect(mapStateToProps, {startRoomListener})(Room);