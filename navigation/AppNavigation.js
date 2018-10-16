import React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import LoginScreen from '../components/LoginScreen.js'
import HomeScreen from '../components/HomeScreen.js'
import ProfileScreen from '../components/ProfileScreen.js'
import RosterScreen from '../components/RosterScreen.js'
import QuizScreen from '../components/QuizScreen.js'
import RandomScreen from '../components/RandomScreen.js'
import CoursesScreen from '../components/CoursesScreen.js'
import CodeRunnerScreen from '../components/CodeRunnerScreen.js'
import PairsScreen from '../components/PairsScreen.js';
import CourseContentScreen from '../components/CourseContentScreen.js'

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

const RootNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Quiz: { screen: QuizScreen },
    Roster: { screen: RosterScreen },
    Random: { screen: RandomScreen },
    Courses: { screen: CoursesScreen },
    CodeRunner: { screen: CodeRunnerScreen },
    Pairs: { screen: PairsScreen },
    CourseSelected: {screen:CourseContentScreen}
}, {initialRouteName: 'Home', navigationOptions: {
    headerStyle: {
      backgroundColor: '#5d8be2',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },transitionConfig: noTransitionConfig });
  
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };