export default {
  addRequest(state, payload) {
    state.requests.push(payload);
    // console.log(payload);
    // console.log(state.requests);
  },
  setRequest(state, payload) {
    state.requests = payload;
  }
};
