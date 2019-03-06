import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {emailChanged, passwordChanged, loginUser} from '../actions';

class AddFriends extends Component{
    static navigationOptions = {
        title: 'Add Friends!',
      };

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onButtonPress(){
        const {email} = this.props;

      
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
                        label="Friend's Email"
                        placeholder="Friend@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.firstName}
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

const mapStateToProps = (state) => {
    const {error, loading} = state.profile;
    const {email} = state.auth;

    return{email, error, loading};
};
export default connect(mapStateToProps, {emailChanged})(AddFriends);