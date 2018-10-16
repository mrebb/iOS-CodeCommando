const initialAuthState = { isLoggedIn: false,justLoggedIn:false,tokens:null,day:null,classCode:null };

//reducer
export default function reducer(state = initialAuthState, action) {
  const {payload} = action;
  switch (action.type) {
    
    case 'Login':
      return { ...state, isLoggedIn: true };

    case 'Logout':
      return { ...state, isLoggedIn: false };

    case 'justLoggedIn':
    return { ...state, justLoggedIn: true, tokens: payload };

    case 'justLoggedOut':
    return { ...state, justLoggedIn: false,tokens:null,day:null,classCode:null };

    case 'CourseSelected':
    return { ...state, day:payload.day, classCode:payload.classCode };

    default:
      return state;
  } 
}

//action creators

export const Login = ()=>{
  return {type:'Login'}
  
}

export const Logout = ()=>{
  return {type:'Logout'}
  
}

export const justLoggedIn = (tokens)=>{

    return {type:'justLoggedIn',payload:tokens};
  
}

export const justLoggedOut = ()=>{
  return {type:'justLoggedOut'}
}

export const CourseSelected = (payload)=>{
  return {type:'CourseSelected',payload}
  
}

