import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {createRoom} from '../actions';

class CreateRoom extends Component{
    constructor(props) {
        super(props);
        this.state = { stack: "", blind: "" };
    }
    static navigationOptions = {
        title: 'Create Room',
      };

    onStackChange(text){
        console.log("stack " + text)
        console.log("state is " + this.state.stack)
        this.setState({stack: text})
        console.log("state is " + this.state.stack)

    }

    onBlindChange(text){
        this.setState({blind: text})
    }

    onButtonPress(){
        const {stack, blind} = this.state;

        this.props.createRoom(stack, blind);
    }

    renderButton(){
        // if(this.props.loading){
        //     return <Spinner size="large"/>;
        // }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Create
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
                        label="Starting Stack"
                        placeholder="500"
                        onChangeText={this.onStackChange.bind(this)}
                        value={this.state.stack}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Big Blind"
                        placeholder="5"
                        onChangeText={this.onBlindChange.bind(this)}
                        value={this.state.blind}
                    />
                </CardSection>

                {/* {this.renderError()} */}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles ={
    errorTextStyle:{
        fontSize: 20,
        alignSelf:'center',
        color: 'red',
    }
}

export default connect(null, {createRoom})(CreateRoom);