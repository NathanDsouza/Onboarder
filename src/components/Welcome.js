import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Welcome extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Welcome!
                </Text>
            </View>
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

export default Welcome;