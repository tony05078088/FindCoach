export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
   // transform into a Boolean
   return !!state.token
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};
 