import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,Linking,
  Image, StatusBar, View, AsyncStorage, ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Wallpaper from './styles/Wallpaper.js'
import Logo from './styles/Logo';
import spinner from '../assets/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 80;
class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectData: null,
      isLoading: false
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }
  _dispatchTwoActions(){
    this.props.navigation.dispatch({ type: 'Login' })
    this.props.navigation.dispatch({ type: 'justLoggedIn',payload:this.state.redirectData })
  }
  componentDidUpdate() {
    
    if (this.state.redirectData !== null) {
      return this._dispatchTwoActions();
    }
  }
  componentWillUnmount(){
    this._removeLinkingListener();
    this.setState({isLoading:false})
  }
  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      this._handlePressAsync()
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }
  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <Wallpaper>
        <Logo/>
        <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="blue"
        />
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <View style={styles.inline} >
              <Icon name="github" size={50} color="#3B5699" /><Text style={styles.text}>LOGIN WITH GITHUB</Text></View>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
      </Wallpaper>
    )
  }
  _handleRedirect = async(event) => {
    let url = event.url;
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  this._removeLinkingListener();
    try {
      await AsyncStorage.setItem('authToken',params.authToken );
      await AsyncStorage.setItem('gitHubToken',params.gitHubToken );
      const authToken = await AsyncStorage.getItem('authToken');
      const gitHubToken = await AsyncStorage.getItem('gitHubToken');
      const TOKENS = {}
    TOKENS.authToken = authToken
    TOKENS.gitHubToken = gitHubToken
    this.setState({ redirectData: TOKENS });
    } catch (error) {
      console.log('Error retrieving Tokens',error)
    }
  };

  _handlePressAsync = async () => {
    let githubURL = 'https://github.com/login/oauth/authorize';
    let options = {
      client_id: 'f749977a8455b627dc56',
      scope: 'read:user repo',
      state:'autumn',
      allow_signup: 'true',
    };
    let QueryString = Object.keys(options).map((key) => {
      return `${key}=` + encodeURIComponent(options[key]);
    }).join('&');
    let AUTH_URL = `${githubURL}?${QueryString}`;
    this._addLinkingListener();
    await Linking.openURL(AUTH_URL);
    
  }
  _addLinkingListener = () => {
    this.setState({isLoading:true})
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }
     this.state.isLoading? <View style={styles.container}><ActivityIndicator size="large" colro="#ff0000" /></View>: null;
  };

};

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoginScreen.navigationOptions = {
  headerTitle: <View style={{ flexDirection: 'row',
  alignItems: 'center',
justifyContent: 'center',}} >
  <Icon name="sign-in" size={40} color="#3B5699" /><Text style={{color: 'white',
    fontWeight:'bold',
    fontSize:20
    }}>      LOGIN </Text></View>,
};
//
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});


export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inline: {
      flexDirection: 'column',
      alignItems: 'center',
    justifyContent: 'center',
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
  logo: {
    color: 'white',
    fontWeight:'bold',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});