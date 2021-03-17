export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://findcoach-a44ed-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const err = new Error(responseData.message || 'Failed to send request');
      throw err;
    }

    console.log(responseData);
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://findcoach-a44ed-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const err = new Error(responseData.message || 'Failed to fetch requests');
      throw err;
    }
    const Requests = [];
    for (const key in responseData) {
      console.log(key);
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      Requests.push(request);
    }
    context.commit('setRequest', Requests);
  }
};
