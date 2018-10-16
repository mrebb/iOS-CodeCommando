import React from 'react';
import {
  Image,
  Dimensions,
  Platform, View, Text, StyleSheet, ActivityIndicator,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types'
import Wallpaper from './styles/Wallpaper.js'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import SelectInput from 'react-native-select-input-ios';
const API = 'http://api.commando.ccs.net/api/v1/user';

export class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesList: [],
      lecturesList: [{ value: 0, label: 'SELECT A COURSE FIRST' }],
      data: null,
      courseToBePassed: null,
      isLoading: true,
      selectedCourse: 0,
      selectedLecture: 0
    }
  }

  _keyExtractor = (index) => index + Math.floor(Math.random() * 200) + '';
  async componentDidMount() {
    if (this.state.coursesList.length === 0) {
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
        .then((response) => {
          let courses = (response.courses);
          let coursesList = []
          coursesList[0] = { value: 0, label: 'SELECT A COURSE' }
          courses.map(course => {
            let obj = {}
            obj.value = course.apiLink
            obj.label = course.classCode
            coursesList.push(obj)
          })
          this.setState({ coursesList });
          this.setState({ isLoading: false })
        })
    }
  }
  _dispatchCourseSelectedAction() {
    this.setState({isLoading:false})
    this.props.dispatch(NavigationActions.navigate({ routeName: 'CourseSelected' }))
  }

  dispatchCourseSettings(value){
    if (value === 0) {
      return this.reset(value);
    }
    this.setState({isLoading:true})
    this.setState({selectedLecture:value})
    const data = {};
    data.day = value;
    data.classCode = this.state.courseToBePassed;
    if(data.classCode!==null && data.day!==0){
    this.props.navigation.dispatch({ type: 'CourseSelected',payload:data })
    this._dispatchCourseSelectedAction();
  }
  }
  resetLecture(value) {
    this.setState({ lecturesList: [{ value: 0, label: 'SELECT A COURSE FIRST' }] })
    this.setState({ selectedLecture: value })
    return;
  }
  getCourseContent(item) {
    const data = {};
    data.apiLink = item.apiLink;
    data.classCode = item.classCode;
    this.setState({ data })
    //this.props.navigation.dispatch({ type: 'CourseSelected',payload:data })
    //this._dispatchCourseSelectedAction();
  }
  updateCourseState(value) {
    let filter = this.state.coursesList.filter((course) => { if (course.value === value) return course.label })
    return filter[0];
  }
  reset(value) {
    this.setState({ lecturesList: [{ value: 0, label: 'SELECT A COURSE FIRST' }] })
    this.setState({ selectedLecture: value })
    this.setState({ selectedCourse: value })
    return;
  }
  loadLecturesList(value) {
    if (value === 0) {
      return this.reset(value);
    }
    let selectedCourse = this.updateCourseState(value)
    this.setState({ selectedCourse: selectedCourse.value })
    this.setState({ selectedLecture: 0 })
    this.setState({ courseToBePassed: selectedCourse.label })
    this.setState({ isLoading: true })
  
    fetch(value).then(res => res.json())
      .then(courseContent => {
        let lecturesList = []
        lecturesList[0] = { value: 0, label: 'SELECT A LECTURE' }
        let i = 0;let regex = /[0-9]/g;
        courseContent.map((lecture) => {
          if ((lecture.name).match(regex)) {
            i = i + 1;
            let obj = {}
            obj.value = i
            obj.label = lecture.name
            lecturesList.push(obj)
          }
        })
        this.setState({ lecturesList })
        this.setState({ isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
        alert('No course content avalable!!', error)
        return;
      })
  }

  onSubmitEditingLarge(value) {
    this.setState({
      selectedLecture: value
    });
  }
  render() {

    if (this.state.coursesList.length > 0 && !this.state.isLoading && !this.state.data) {
      return (
          <Wallpaper>
          <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <Image style={{width:'25%',height:'40%',overflow:"visible"}} source={require('../assets/courselist.jpg')}/>
            <View style={styles.row}>
              <View style={styles.smallInputWrapper}>
                <Text style={styles.label}>
                  Course List
            </Text>
                <SelectInput
                  value={this.state.selectedCourse}
                  options={this.state.coursesList}
                  onCancelEditing={() => console.log('onCancel')}
                  onSubmitEditing={this.loadLecturesList.bind(this)}
                  style={[styles.selectInput, styles.selectInputSmall]}
                />
              </View>
            </View>

            <Text style={styles.label}>
              List of Lectures
        </Text>

            <SelectInput
              value={this.state.selectedLecture}
              options={this.state.lecturesList}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={this.dispatchCourseSettings.bind(this)}
              style={[styles.selectInput, styles.selectInputLarge]}
            />
          </ScrollView>
          </Wallpaper>
      );
    }
    else if (!this.state.isLoading && this.state.coursesList.length === 0) {
      return (<View style={styles.container}><Text style={styles.row}>No Course added yet!! Go ahead and add a classCode</Text></View>)
    }
    else if (this.state.isLoading) {
      return (
        <Wallpaper><ActivityIndicator style={styles.activityIndicator} color="#FA1111" size="large" /></Wallpaper>
      )
    }
    else {
      return (
        <Wallpaper>
        </Wallpaper>
      )
    }

  }
}
CoursesScreen.navigationOptions = {
  title: 'Courses',
};
CoursesScreen.propTypes = {
  tokens: PropTypes.object.isRequired,
  justLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tokens: state.auth.tokens,
  justLoggedIn: state.auth.justLoggedIn
});

export default connect(mapStateToProps)(CoursesScreen);

const SCREEN_WIDTH = Dimensions.get('window').width;
const MARGIN_SMALL = 8;
const MARGIN_LARGE = 12;

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInputWrapper: {
    flexDirection: 'column'
  },
  selectInput: {
    flexDirection: 'row',
    height: 36,
    borderWidth: 1,
    borderRadius: 4,
    padding: MARGIN_SMALL,
    marginTop: MARGIN_LARGE,
    backgroundColor: '#FFFFFF',
  },
  selectInputSmall: {
    width: SCREEN_WIDTH * 0.5 - (MARGIN_LARGE * 2),
  },
  selectInputLarge: {
    width: SCREEN_WIDTH - (MARGIN_LARGE * 2),
  },
  bananawrapper: {
    margin: MARGIN_LARGE * 2,
    marginBottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: SCREEN_WIDTH * 0.75,
    height: 1,
    marginLeft: SCREEN_WIDTH * 0.075,
    backgroundColor: 'black',
  },
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
  activityIndicator: {
    flex: 1,
    top: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});