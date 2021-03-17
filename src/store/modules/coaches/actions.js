export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const response = await fetch(
      `https://findcoach-a44ed-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );
    console.log(response);
    // const responseData = await response.json();
    // console.log(responseData);

    if (!response.ok) {
      // error happen
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      `https://findcoach-a44ed-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      // error ...
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
      console.log(coaches);
    }
    context.commit('setCoaches', coaches);
  }
};
