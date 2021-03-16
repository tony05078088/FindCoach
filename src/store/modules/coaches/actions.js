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
  }
};
