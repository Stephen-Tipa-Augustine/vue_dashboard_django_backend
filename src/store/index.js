import { createStore } from 'vuex'
import axios from 'axios'


const store = createStore({
    state: {
        accessToken: null,
        refreshToken: null,
        APIData: [],
    },
    mutations: {
        updateStorage(state, {access, refresh}) {
            state.accessToken = access;
            state.refreshToken = refresh;
        },
        updateAccidentData(state, {data}) {
            state.APIDate = data;
        },
    },
    actions: {
        async register(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:8000/auth/register/', {
                    username: credentials.username,
                    password: credentials.password,
                    email: credentials.email,
                    first_name: credentials.firstName,
                    last_name: credentials.lastName,
                    phone: credentials.phone,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch((error) => {
                        let errorMessage = ''
                        if ('email' in error.response.data) {
                            errorMessage = "We already have an existing account with the email you provided! Please log in instead."
                        } else {
                            errorMessage = "Registration failed, please review your input data!"
                        }
                        reject(errorMessage)
                    })
            })
        },

        async login(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:8000/auth/login/', {
                    email: credentials.email,
                    password: credentials.password,
                    },
                    {
                        headers: { 'Content-Type': 'application/json',}})
                    .then(res => {
                        context.commit('updateStorage', {access: res.data.access, refresh: res.data.refresh});
                        localStorage.setItem('user', JSON.stringify(res.data));
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject('Wrong credentials! Please review your input.')
                    })
            })
        },

        async retrieveAccidents(context) {
            let api = 'http://127.0.0.1:8000/accidents/'
            const token = JSON.parse(localStorage.getItem('user')).access;
            axios.get(api, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }).then((response) => {
                  console.log('This is the accident data!!!')
                  console.log(response.data)
                  context.commit('updateAccidentData', {data: response.data});
              }).catch((error) => console.log(error))
        },

        async getUserDetails(context) {
            let api = 'http://127.0.0.1:8000/auth/user-details/'
            const token = JSON.parse(localStorage.getItem('user')).access;
            axios.get(api, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }).then((response) => {
                  console.log('User details are:');
                  console.log(response.data);
              }).catch((error) => console.log(error))
        },
    },
})

export default store;
