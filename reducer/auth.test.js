import  authReducer, {Login,Logout,justLoggedIn,justLoggedOut,CourseSelected} from './auth.js';

describe('auth state', () => {

    describe('auth actions', () => {
        it('should create Login action', () => {

            const auth = { type: 'Login' };

            const action = Login();
      
            expect(action.type).toBe(auth.type);
    
          });
          it('should create Logout action', () => {

            const auth = { type: 'Logout' };

            const action = Logout();
      
            expect(action.type).toBe(auth.type);
    
          });
          it('should create justLoggedIn action', () => {

            const auth = { type: 'justLoggedIn',payload: { authToken: 'abcd',gitHubToken:'1234' }};

            const action = justLoggedIn({ authToken: 'abcd',gitHubToken:'1234' });
      
            expect(action.type).toBe(auth.type);
            expect(action.payload).toEqual(auth.payload)
    
          });
          it('should create justLoggedOut action', () => {

            const auth = { type: 'justLoggedOut' };

            const action = justLoggedOut();
      
            expect(action.type).toBe(auth.type);
    
          });
          it('should create CourseSelected action', () => {

            const course = { type: 'CourseSelected',payload: { day: '01-NodeEcoSystem',classCode:'401n5' }};

            const action = CourseSelected({ day: '01-NodeEcoSystem',classCode:'401n5' });
      
            expect(action.type).toBe(course.type);
            expect(action.payload).toEqual(course.payload);
    
          });
    })
    describe('auth reducer', () => {

        it('should update Login state when user logs in', () => {
      
            let action = {type:'Login'};
            
            let initialState = {isLoggedIn: false}
      
            let state = authReducer(initialState, action);
      
            expect(state.isLoggedIn).toBe(true);
          });
    
          it('should update Login state when user logs out', () => {
      
            let action = {type:'Logout'};
            
            let initialState = {isLoggedIn: true}
      
            let state = authReducer(initialState, action);
      
            expect(state.isLoggedIn).toBe(false);
          });
      
        it('should update justLoggedIn state when user just lands on home page after successful login ', () => {
    
          const tokens = { authToken: 'abcd',gitHubToken:'1234' };
    
          let action = {type:'justLoggedIn',payload:tokens};
          
          let initialState = {justLoggedIn:false,tokens:null}
    
          let state = authReducer(initialState, action);
    
          expect(state.justLoggedIn).toBe(true);
          expect(state.tokens).toBe(tokens);
        });
        
        it('should update justLoggedIn & course state back to initial state when user logs out ', () => {
    
            const tokens = { authToken: 'abcd',gitHubToken:'1234' };
            const course = { day: '01-Node Eco Systems',classCode:'401n5' };
    
            let action = {type:'justLoggedOut',payload:tokens};
            
            let initialState = {justLoggedIn:true,tokens:tokens,day:course.day,classCode:course.classCode}
      
            let state = authReducer(initialState, action);
      
            expect(state.justLoggedIn).toBe(false);
            expect(state.tokens).toBe(null);
            expect(state.day).toBe(null);
            expect(state.classCode).toBe(null);
          });
    
          it('should update courseSelected state when user selects course & day from courses component ', () => {
    
            const course = { day: '01-Node Eco Systems',classCode:'401n5' };
      
            let action = {type:'CourseSelected',payload:course};
            
            let initialState = {day:null,classCode:null}
      
            let state = authReducer(initialState, action);
      
            expect(state.day).toBe(course.day);
            expect(state.classCode).toBe(course.classCode);
          });
    
    
      });
    
})
  