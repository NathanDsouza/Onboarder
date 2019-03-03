import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Button, Input, Spinner} from './common';
import {logoutUser} from '../actions';



class Welcome extends Component{

    onButtonPress(){
        this.props.logoutUser();
    }

    render(){
        return(
           
                <Card>
                    <Text style={styles.textStyle}>
                        Welcome!
                    </Text>
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>  
                            Logout
                        </Button>    
                    </CardSection>
                                      
                </Card>

        );
    }
}

const styles={
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 50,
    }
}

export default connect(null, {logoutUser})(Welcome);