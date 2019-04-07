import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {joinGame} from '../actions';

class JoinRoom extends Component{
    constructor(props) {
        super(props);
        this.state = { roomId: "" };
    }
    static navigationOptions = {
        title: 'Join Room',
      };

    onRoomIdChange(text){
        this.setState({roomId: text})
    }

    onButtonPress(){
        const {roomId} = this.state;

        this.props.joinGame(roomId);
    }

    renderButton(){
        // if(this.props.loading){
        //     return <Spinner size="large"/>;
        // }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Join
            </Button>
        );
    }

    // renderError(){
    //     if (this.props.error) {
    //         return(
    //         <Text style={styles.errorTextStyle}>
    //                 {this.props.error}
    //         </Text>
    //         );
    //     }
    // }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Room Id"
                        onChangeText={this.onRoomIdChange.bind(this)}
                        value={this.state.roomId}
                    />
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}


export default connect(null, {joinGame})(JoinRoom);