import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,AsyncStorage,
} from 'react-native';
const window = Dimensions.get('window');
class Menu extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isLoading:true,
      uri:'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png',
      name:''
    }
  }
  componentDidUpdate() {
    
    if(this.props.justLoggedIn && this.state.isLoading)
    {
        this.retrieveToken().then((githubToken)=>{
          fetch(`https://api.github.com/user?access_token=${githubToken}`)
          .then(response => response.json())
          .then(user=>{
            let uri = user.avatar_url;
            let name = user.name;
            this.setState({uri,name})
            this.setState({isLoading:false})
          });
        })
      }
  }
  
  retrieveToken= async()=>{
      const githubToken = await AsyncStorage.getItem('gitHubToken');
      return githubToken;
    }
  dispathBoth=(item)=>{
    this.props.onItemSelected(item)
    this.props.dispatch(NavigationActions.navigate({ routeName: item }))
  }
  
  render(){
  if (!this.props.justLoggedIn) {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
      <Text
        onPress={()=>this.dispathBoth('Home')}
        style={styles.home}
      >Home
      </Text>
      <Text
        onPress={()=>this.dispathBoth('Login')}
        style={styles.login}
      >Login
      </Text>
      </ScrollView>
    )
  }
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri:this.state.uri}}
        />
        <Text style={styles.name}>{this.state.name}</Text>
      </View>
      <Text
        onPress={()=>this.dispathBoth('Home')}
        style={styles.home}
      >
        Home
      </Text>
      <Text
       onPress={()=>this.dispathBoth('Courses')}
        style={styles.item}
      >
        Courses
      </Text>
      <Text
        onPress={()=>this.dispathBoth('Roster')}
        
        style={styles.item}
      >
        Roster
      </Text>
      <Text
        onPress={()=>this.dispathBoth('Pairs')}
        
        style={styles.item}
      >
        Pairs
      </Text>
      <Text
        onPress={()=>this.dispathBoth('Random')}
        style={styles.item}
      >
        Random
      </Text>
      <Text
        onPress={()=>this.dispathBoth('Quiz')}
        style={styles.item}
      >
        Quiz
      </Text>
    </ScrollView>
  );
    }
    
    
}

Menu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  justLoggedIn:PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  justLoggedIn: state.auth.justLoggedIn
});

export default connect(mapStateToProps)(Menu);
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#9671bc',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    flex: 1,
    fontSize: 30,
    fontWeight: '400',
    paddingTop: 50,
    textDecorationLine: 'underline' ,
    color: '#FFFFFF',
    marginHorizontal: '5%',
  },
  home: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 30,
    marginHorizontal: '5%',
    fontWeight: '400',
    paddingTop: 35,
    flexDirection: 'row',
    textDecorationLine: 'underline' ,
    
  },
  login: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 30,
    marginHorizontal: '5%',
    textDecorationLine: 'underline' ,
    fontWeight: '400',
    paddingTop: 50,
  },
});