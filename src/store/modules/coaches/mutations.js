export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
    //alert('Create Successfully!');
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
     state.lastFetch = new Date().getTime();
  }
};
