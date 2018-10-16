import React,{Fragment} from 'react';
import { 
  Platform,View, Text, ScrollView, FlatList, StyleSheet,ActivityIndicator,ImageBackground } from 'react-native';
import PropTypes from 'prop-types'
import Wallpaper from './styles/Wallpaper.js'
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';  
import AwesomeAlert from 'react-native-awesome-alerts'
import dog from '../assets/dogconfused.jpg'

const htmlContent = `
    <br/>
    <h2 style="textAlign: center;">Select a Class Code and Day from 'Courses' tab</h2>
    <em style="textAlign: center;"></em>
`;
export class RosterScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allStudents: [],
      show:true
  }
}

_keyExtractor = (index) => index+'';
async componentDidMount(){
  if(this.props.day && this.props.classCode){
    const API =`http://api.commando.ccs.net/api/v1/roster?classCode=${this.props.classCode}`
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
    .then((roster) => {
      
      let allStudents = (roster.results);
      this.setState({allStudents});
          })
}
}
    render() {
      if(this.props.day && this.props.classCode){
        return (
         this.state.allStudents.length>0?
        <Wallpaper>
        <View >
        <FlatList 
        data={[...this.state.allStudents]} 
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => <Text style={styles.row}>{item}</Text>}/>
       </View></Wallpaper>:<Wallpaper><ActivityIndicator style= {styles.activityIndicator} color="#FA1111"  size="large"/></Wallpaper>
          
        );
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
  RosterScreen.navigationOptions = {
    title: 'Roster',
  };
RosterScreen.propTypes = {
    tokens: PropTypes.object.isRequired,
    justLoggedIn:PropTypes.bool.isRequired,
  };
  
  const mapStateToProps = state => ({
    tokens: state.auth.tokens,
    justLoggedIn: state.auth.justLoggedIn,
    day: state.auth.day,
    classCode:state.auth.classCode
  });
  
  export default connect(mapStateToProps)(RosterScreen);

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
  