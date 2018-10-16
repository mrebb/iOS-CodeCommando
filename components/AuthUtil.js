import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,ActivityIndicator,
  Text,View,AsyncStorage,Image
} from 'react-native';
import Wallpaper from './styles/Wallpaper.js'
import Logo from './styles/Logo.js';
import { NavigationActions } from 'react-navigation';
import Dimensions from 'Dimensions';
import Button from './styles/Button.js'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 80;

class AuthButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    };
  }
  componentDidUpdate(){
    this.timerHandle = setTimeout(() => {
      this.setState({ isLoading: false })
      this.timerHandle = 0;
    }, 3000);
  }
  componentWillUnmount(){
    this.setState({ isLoading: true }) 
    if (this.timerHandle) {        
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;   
  }   
  }
 _logOut=async()=>{
  await AsyncStorage.removeItem('authToken');
  console.log('auth token deleted')
  await AsyncStorage.removeItem('gitHubToken');
  console.log('github token deleted')
  this._dispathLogOut()
  }
  _dispathLogOut(){
  this.props.logout()
  this.props.justLoggedOut()
  }
  render() {
    
  if(this.props.isLoggedIn){
    return (
      (this.state.isLoading) ? <Wallpaper><ActivityIndicator style= {styles.activityIndicator}size="large" color="#FA1111" /></Wallpaper> : 
      <Wallpaper>
        <Image style={{width:'70%',height:'60%',overflow:"visible"}}
          source={require('../assets/skilldevelopment.jpg')}
        />
      <View style={styles.container}>
      <Text style={styles.status}>
        {'Welcome to Code Commando!!'}
      </Text>
      </View>
      <View style={styles.container}>
        <Button styles={{ button: styles.logoutButton, label: styles.buttonWhiteText }}
          label= 'SIGN OUT'
          onPress={this._logOut}
        />
      </View>
      </Wallpaper>
    )
        }
        return (
          <Wallpaper>
      <Logo/>
          <View style={styles.container}>
          <View style={styles.container}>
             <Text style={styles.welcome}>Welcome to Code Commando!!</Text>
             </View>
             <View style={styles.container}>
            <Button styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
              // label={this.props.isLoggedIn ? 'SIGN OUT' : 'Go TO LOGIN SCREEN'}
              label= 'GO TO LOGIN SCREEN'
              onPress={this.props.isLoggedIn ? this.props.logout : this.props.loginScreen}
            />
          </View>
          </View>
          </Wallpaper>
        )
       
  }
};

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
  justLoggedOut:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'Logout' }),
  justLoggedOut: () => dispatch({ type: 'justLoggedOut' }),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -85,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },   
  activityIndicator: {
    flex: 1,
    top: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
 },
  inline: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWhiteText: {

    color: 'white',
    backgroundColor: 'transparent'
  },
  status:{
    color: 'black',
    backgroundColor: 'transparent',
    fontSize:20
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 20,
    zIndex: 100,
    backgroundColor: '#F035E0'
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 20,
    zIndex: 100,
    backgroundColor: '#3234d1'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  welcome: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize:30
  },
  image: {
    width: 24,
    height: 24,
  },
});