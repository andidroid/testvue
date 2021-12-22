import axios from "axios";

export default {
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  SET_ROLES(state, roles) {
    console.log('store auth mutations set roles ', roles);
    state.roles = roles;
    localStorage.setItem('roles', JSON.stringify(roles));
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('token', JSON.stringify(token));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};