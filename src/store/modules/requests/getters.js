export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    //把全部的request中 與現在的coachId相符的找出來
    return state.requests.filter(req => req.coachId === coachId);
  },
  hasRequests(_, getters) {
    //只回傳相符的request
    return getters.requests && getters.requests.length > 0;
  }
};
