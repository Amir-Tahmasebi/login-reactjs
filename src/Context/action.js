import { actionTypes } from "./reducer"

export const loginRequest = () => {
    return {
        type: actionTypes.LOGIN_REQUEST
    }
}
export const loginSuccess = (user, token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            user,
            token
        }
    }
}
export const loginError = (error) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        payload: { error }
    }
}
export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}