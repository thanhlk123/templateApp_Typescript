import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import SplashScreens from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from '@screens/SplashScreen/index';
import Walkthrough from '@screens/Walkthrough/index';

import {navigationRef} from '../RootNavigation';
const RootStack = createStackNavigator();

const AppNavigator = () => {
  useEffect(() => {
    SplashScreens.hide();
  }, []);
  const {isSignedIn} = useSelector((state: any) => state.login);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <RootStack.Navigator
          screenOptions={{headerShown: false}}
          // headerMode="screen"
          initialRouteName="SplashScreen">
          <RootStack.Screen
            component={SplashScreen}
            name="SplashScreen"
            options={{headerShown: false}}
          />
          <RootStack.Screen
            component={Walkthrough}
            name="Walkthrough"
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
