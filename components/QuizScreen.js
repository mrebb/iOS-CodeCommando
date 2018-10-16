import React, { Fragment } from 'react';
import { View, StyleSheet, FlatList, SectionList, Text, ActivityIndicator, Platform,ScrollView,Dimensions,ImageBackground } from 'react-native';
import Wallpaper from './styles/Wallpaper.js'
import Logo from './styles/Logo.js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';  
import AwesomeAlert from 'react-native-awesome-alerts'
import dog from '../assets/dogconfused.jpg'
const htmlContent = `
<br/>
    <h2 style="textAlign: center;">Select a Class Code and Day from 'Courses' tab</h2>
    <em style="textAlign: center;"></em>
`;
const htmlContentBadDay = `
<br/><br/><br/><br/><br/><br/><br/><br/>
<img src="https://media.makeameme.org/created/wait-you-kidding.jpg" />
<em style="textAlign: center;">No one is hungry for Quiz on Day 1<br/> select a different day</em>
`;

export class QuizScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oQList: [],
      isLoading:true,
      show:true,
      badDay:false,
    }
  }
  _keyExtractor = (index) => index + '';
  async componentDidMount() {
    if(this.props.day===1){
      return;
    }
    if(this.props.day && this.props.classCode){
      if(this.props.day>1){
      const API = `http://api.commando.ccs.net/api/v1/quiz/${this.props.day}`;
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
      .then((quiz) => {
        let questions = quiz.results.map(question => question.question);
        let answers = quiz.results.map(question => question.answers ? question.answers : '_______________');
        let oQList = questions.map((q, i) => q + '\n\n' + answers[i]);
        this.setState({ oQList });
        this.setState({isLoading:false})
      })
      .catch(err=>{
        this.setState({isLoading:false})
        console.log(`Error retrieving Quiz data: ${err}`)})
  }
  
}
}
  render() {
if(this.props.day && this.props.classCode && this.props.day>1){
if(this.state.oQList.length > 0 && !this.state.isLoading){
    return (
      <Wallpaper>
        <View >
          <FlatList
            data={[...this.state.oQList]}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => <Text style={styles.row}>{item}</Text>}/>
        </View>
      </Wallpaper> 
    );
}
else if(!this.state.isLoading && this.state.oQList.length ===0){
  return(<Wallpaper><Text style={styles.row}>No quiz data available!!</Text></Wallpaper>)
}
else{
  return(<Wallpaper><ActivityIndicator style={styles.activityIndicator} color="#FA1111" size="large" /></Wallpaper>)
}
}
else if(this.props.day===1){
  return(
   <Wallpaper>
    <ScrollView style={{ flex: 1}}>
      <HTML html={htmlContentBadDay} />
      <AwesomeAlert confirmButtonColor={'#F035E0'} show = {this.state.show} 
    showConfirmButton={true}
    confirmText={ 'Wait for one more day'} onConfirmPressed={() => {
      this.setState({show:false})}}/>
  </ScrollView>
  </Wallpaper>
     
  )
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

QuizScreen.navigationOptions = {
  title: 'Quiz',
};

QuizScreen.propTypes = {
  tokens: PropTypes.object.isRequired,
  justLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  tokens: state.auth.tokens,
  justLoggedIn: state.auth.justLoggedIn,
  day: state.auth.day,
  classCode:state.auth.classCode
});

export default connect(mapStateToProps)(QuizScreen);


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
    alignItems: 'center',
    backgroundColor: '#660066',
    padding: 16,
    height: 180,
    flex: 1,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 4,
    fontSize: 20,
    color: '#FFFFFF',


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
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
