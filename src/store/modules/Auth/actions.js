export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBx1KIl5zxxzIUylT2eZS3NQ1nwvqyZOPc';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBx1KIl5zxxzIUylT2eZS3NQ1nwvqyZOPc';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const err = new Error(responseData.message || 'Failed to authenticate');
      throw err;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
                           context.commit('setUser', {
                             token,
                             userId,
                             tokenExpiration: null
                           });
                         }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
