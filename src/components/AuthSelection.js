import React, {Component} from 'react';
import {Card, CardSection, Input, Button, Header} from './common'
import NavigationService from '../actions/NavigationService';

class AuthSelection extends Component{
    

    static navigationOptions = {
        title: 'Welcome to the Onboarder!',
      };

    onButtonPress(){
        NavigationService.navigate('EmailLogin');
    }
    render(){
        return(
            <Card>    
                
                    <Header headerText="Log in!"/>
          
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                    Email
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                    SMS
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default AuthSelection;