import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import { startRoomListener, bet } from '../actions'

class Room extends Component{
    constructor(props) {
        super(props)
        this.state = { betSize: '0' };
    }

    componentDidMount(){
        console.log("room my dude")
        this.props.startRoomListener()
    }

    betSizeChange(betSize){
        this.setState({betSize})
    }

    onButtonPress(){
        this.props.bet(this.state.betSize);
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
                <CardSection>
                    <Input
                        label="Bet"
                        placeholder="$$$"
                        onChangeText={this.betSizeChange.bind(this)}
                        value={this.state.betSize}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Raise/Bet
                    </Button>
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

export default connect(mapStateToProps, {startRoomListener, bet})(Room);