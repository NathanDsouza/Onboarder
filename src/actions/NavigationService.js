import { StackActions, NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function resetNavigation(targetRoute) {
  const resetAction = StackActions.reset({
    index: 0, 
    key: null,
    actions: [
      NavigationActions.navigate({ routeName: targetRoute }),
    ],
  });
  
  _navigator.dispatch(resetAction);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  resetNavigation,
};