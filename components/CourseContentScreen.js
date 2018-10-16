import React from 'react';
import {
  ScrollView,
  Dimensions,
  Platform,StyleSheet,ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types'
import Wallpaper from './styles/Wallpaper.js'
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';  

export class LectureContentScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      readme: '',
      isLoading:true,
  }
}

async componentDidMount(){
  if(this.props.day && this.props.classCode && this.props.classCode!=='401n5'){
  const API =`http://api.commando.ccs.net/api/v1/readme/${this.props.day}?classCode=${this.props.classCode}`
console.log('api',API)
  fetch(API,{
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: new Headers({
      'Authorization': `Bearer ${this.props.tokens.authToken}`,
      'Content-Type': 'application/json'
    }),
  })
    .then((response) => response.text())
    .then(readme=>{
      this.setState({readme});
      this.setState({isLoading:false})
          })
          .catch(err=>{
            console.log('unable to retrieve README file',err)
            this.setState({isLoading:false})
            return;
          })
        }
        //Temporary fix untill server side returns response
        else if (this.props.classCode=='401n5'){
          fetch(`https://raw.githubusercontent.com/codefellows/seattle-javascript-401n5/master/08-rest/README.md`)
          .then(response=>response.text())
          .then(readme=>{
            this.setState({readme});
            this.setState({isLoading:false})
                })
                .catch(err=>{
                  console.log('unable to retrieve README file',err)
                  this.setState({isLoading:false})
                  return;
                })
        }
        else{
          this.setState({isLoading:false})
        }
}
    render() {
      if (this.state.isLoading) {
        return (
          <Wallpaper><ActivityIndicator style={styles.activityIndicator} color="#FA1111" size="large" /></Wallpaper>
        )
      }
        return (
          <Wallpaper>
            <ScrollView style={{ flex: 1 }}>
          <HTML html={`
    <h1>README.md</h1><img src="http://i.imgur.com/7v5ASc8.png"/>
    <h3>${this.state.readme}</h3>
`}imagesMaxWidth={Dimensions.get('window').width} />
      </ScrollView>
      </Wallpaper>
          
        );
      }
  }
  LectureContentScreen.navigationOptions = {
    title: 'Lecture Content',
  };
LectureContentScreen.propTypes = {
    tokens: PropTypes.object.isRequired,
    justLoggedIn:PropTypes.bool.isRequired,
    day: PropTypes.number.isRequired,
    classCode:PropTypes.string.isRequired,
  };
  
  const mapStateToProps = state => ({
    tokens: state.auth.tokens,
    justLoggedIn: state.auth.justLoggedIn,
    day: state.auth.day,
    classCode:state.auth.classCode
  });
  
  export default connect(mapStateToProps)(LectureContentScreen);

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      ...Platform.select({
        ios: {
          paddingTop: 20,
        },
      }),
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F035E0',
      height: 20,
      borderRadius: 20,
    },
    name: {
      fontSize: 18,
      textAlign: 'center',
    },
    activityIndicator: {
      flex: 1,
      top: 200,
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
  row: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#660066',
    padding: 10,
    height: 95,
    flex: 1,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 4,
    fontSize: 24,
    color: '#FFFFFF',


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },
  });