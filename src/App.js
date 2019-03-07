import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LandingScreen from './components/LandingScreen';
import EmailLogin from './components/EmailLogin';
import Welcome from './components/Welcome';
import AddFriends from './components/AddFriends';
import NavigationService from './actions/NavigationService'
import Profile from './components/Profile'
import Loading from './components/Loading'
import firebaseSetup from './firebase';



const RootStack = createStackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
    },
    EmailLogin: {
      screen: EmailLogin,
    },
    Welcome: {
      screen: Welcome,
    },
    Profile: {
      screen: Profile,
    },
    Loading: {
      screen: Loading,
    },
    AddFriends: {
      screen: AddFriends,
    },
  },
  {
    initialRouteName: 'Loading',
    cardStyle: {
      backgroundColor: "#9FAF90",
    }
  }
);
//https://coolors.co/258ea6-549f93-9faf90-e2b1b1-e2c2ff

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentWillMount(){
    firebaseSetup;//?
  }
  render() {
    const store=(createStore(reducers, {}, applyMiddleware(ReduxThunk)));
    return(
      <Provider store={store} >
        <AppContainer 
          ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
      );
  }
}