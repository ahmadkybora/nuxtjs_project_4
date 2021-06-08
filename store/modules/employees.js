import Axios from 'axios'

const state = () => ({
    getEmployees: {},
    isEmployee: {}
});

const getters = {
    getEmployees(state) {
        return state.getEmployees
    },
    isEmployee(state) {
        return state.isEmployee
    },
};

const actions = {
    getEmployees(context) {
        Axios.get(Axios.defaults.baseURL + 'panel/employees')
            .then(res => {
                const getEmployees = res.data.data.employees;
                context.commit('getEmployees', getEmployees);
            }).catch(err => {
            console.log(err)
        })
    },
    showEmployee(context, payload) {
        const employeeId = payload.id;
        const employees = context.state.getEmployees;
        console.log(employees[3].id);
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === employeeId) {
                const isEmployee = employees[i];
                context.commit('isEmployee', isEmployee);
            }
        }
    },
    editEmployee(context, payload) {
        const employeeId = payload.id;
        const employees = context.state.getEmployees;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === employeeId) {
                const isEmployee = employees[i];
                context.commit('isEmployee', isEmployee);
            }
        }
    },
    isEmployeeUpdate(context, payload) {
        const isUpdate = {
            id: payload.id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            username: payload.username,
            email: payload.email,
            mobile: payload.mobile,
            home_phone: payload.home_phone,
            zip_code: payload.zip_code,
            password: payload.password,
            confirmation_password: payload.confirmation_password,
            home_address: payload.home_address,
            work_address: payload.work_address,
        };
        Axios.patch(Axios.defaults.baseURL + 'panel/employees/' + payload.id, isUpdate)
            .then(res => {
                const getEmployees = res.data.data.data;
                context.commit('getEmployees', getEmployees);
            }).catch(err => {
            console.log(err)
        })
    }
};

const mutations = {
    isEmployee(state, payload) {
        state.isEmployee = payload
    },
    getEmployees(state, payload) {
        state.getEmployees = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
