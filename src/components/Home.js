import React, {Component} from 'react';
import firebaseSetup from '../firebase';
import {Card, CardSection, Input, Button, Header} from './common'
import NavigationService from '../actions/NavigationService';

class Home extends Component{
    componentWillMount(){
        firebaseSetup;
    }

    static navigationOptions = {
        title: 'Welcome to the Onboarder!',
      };

    onButtonPress(){
        NavigationService.navigate('EmailLogin');
    }
    render(){
        return(
            <Card>        
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

export default Home;