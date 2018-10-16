import React from 'react';
import PropTypes from 'prop-types'
import { View,ScrollView,Dimensions, Text,StyleSheet,ActivityIndicator,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Wallpaper from './styles/Wallpaper.js'
import HTML from 'react-native-render-html';  
import AwesomeAlert from 'react-native-awesome-alerts'
import dog from '../assets/dogconfused.jpg'

const htmlContent = `
    <br/>
    <h2 style="textAlign: center;">Select a Class Code and Day from 'Courses' tab</h2>
    <em style="textAlign: center;"></em>
`;

export class RandomScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      student: null,
      show:true
  }
}
async componentDidMount(){
  if(this.props.day && this.props.classCode){
  const API = `http://api.commando.ccs.net/api/v1/roster/random?classCode=${this.props.classCode}`;
    fetch(API, { 
      method: 'GET', 
      withCredentials: true,
      credentials: 'include',
      headers: new Headers({
        'Authorization': `Bearer ${this.props.tokens.authToken}`, 
        'Content-Type': 'application/json'
      }), 
    })
    .then((res) => res.json())
    .then((random) => {
      let studentArray = random.results;
      let student = studentArray[0]
      this.setState({student});
          })
          .catch(err=>{
            console.log(`Error retrieving Random Student: ${err}`)})
}
}
    render() {
      if(this.props.day && this.props.classCode){
          if(this.state.student){
            return(
           <Wallpaper>
             <ScrollView style={{ flex: 1 }}>
              <HTML html={`
              <br/><br/><br/><br/><br/>
<h1 style="textAlign: center;">${this.state.student}</h1>
<img src="https://media1.tenor.com/images/da2c52f4d1cf4141b16d32d6fddbabc9/tenor.gif?itemid=4498499" alt="lucky you"/>
`} imagesMaxWidth={Dimensions.get('window').width} />
  </ScrollView>
          </Wallpaper>)
          }
          else {
            return(<ActivityIndicator style= {styles.activityIndicator} style= {styles.activityIndicator} color="#FA1111" size="large"/>)
          }
      }
      else{
        return(
          <ImageBackground style={{flex:1,width:'100%',height:'100%'}} source={dog}>
          <ScrollView style={{ flex: 1 }}>
            <HTML html={htmlContent} />              
        </ScrollView>
        <AwesomeAlert confirmButtonColor={'#F035E0'} show = {this.state.show}   
          messageStyle= {{'fontSize':20}}
          showConfirmButton={true}
          confirmText={ 'Select a Class Code and Day from Courses'} onConfirmPressed={() => {
            this.setState({show:false})}}/>
        </ImageBackground>
        )
      }
      }
  }
  RandomScreen.navigationOptions = {
    title: 'Random Student',
  };
  RandomScreen.propTypes = {
    tokens: PropTypes.object.isRequired,
    justLoggedIn:PropTypes.bool.isRequired,
    
  };
  
  const mapStateToProps = state => ({
    tokens: state.auth.tokens,
    justLoggedIn: state.auth.justLoggedIn,
    day: state.auth.day,
    classCode:state.auth.classCode
  });
  
  export default connect(mapStateToProps)(RandomScreen);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      top: -50,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    name: {
      color: 'white',
      backgroundColor: 'transparent',
      fontSize:30
    },
    activityIndicator: {
      flex: 1,
      top: 200,
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
  });