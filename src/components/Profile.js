import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {firstNameChanged, lastNameChanged, usernameChanged, profileCreate} from '../actions';


class Profile extends Component{
    static navigationOptions = {
        title: 'Create a profile!',
      };

    onFirstNameChange(text){
        this.props.firstNameChanged(text);
    }

    onLastNameChange(text){
        this.props.lastNameChanged(text);
    }

    onUsernameChange(text){
        this.props.usernameChanged(text);
    }

    onButtonPress(){
        const {firstName, lastName, username} = this.props;

        this.props.profileCreate(firstName, lastName, username);
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large"/>;
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Create
            </Button>
        );
    }

    renderError(){
        if (this.props.error) {
            return(
            <Text style={styles.errorTextStyle}>
                    {this.props.error}
            </Text>
            );
        }
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="First Name"
                        placeholder="Johnathan"
                        onChangeText={this.onFirstNameChange.bind(this)}
                        value={this.props.firstName}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Last Name"
                        placeholder="Smittheus"
                        onChangeText={this.onLastNameChange.bind(this)}
                        value={this.props.lastName}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Username"
                        placeholder="CoolUsername97"
                        onChangeText={this.onUsernameChange.bind(this)}
                        value={this.props.username}
                    />
                </CardSection>


                {this.renderError()}

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

const mapStateToProps = ({profile}) => {
    const {firstName, lastName, username, error, loading} = profile;

    return{firstName, lastName, username, error, loading};
};
export default connect(mapStateToProps, {
    firstNameChanged, lastNameChanged, usernameChanged, profileCreate
})(Profile);