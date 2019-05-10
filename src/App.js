import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import AuthSelection from './components/AuthSelection';
import EmailLogin from './components/EmailLogin';
import Welcome from './components/Welcome';
import AddFriends from './components/AddFriends';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import NavigationService from './actions/NavigationService'
import Profile from './components/Profile'
import LandingScreen from './components/LandingScreen'
import firebaseSetup from './firebase';
import Room from './components/Room'
import SplashScreen from 'react-native-splash-screen';



const RootStack = createStackNavigator(
  {
    AuthSelection: {
      screen: AuthSelection,
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
    LandingScreen: {
      screen: LandingScreen,
    },
    AddFriends: {
      screen: AddFriends,
    },
    CreateRoom: {
      screen: CreateRoom,
    },
    JoinRoom: {
      screen: JoinRoom,
    },
    Room: {
      screen: Room,
    }
  },
  {
    initialRouteName: 'LandingScreen',
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

  componentDidMount(){
    SplashScreen.hide()
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