import {
    APPLY_TO_LEAVE, APPROVE_LEAVE,
    CANCEL_LEAVE, EDIT_LEAVE,
    GET_EMPLOYEE_INFO,
    GET_EMPLOYEE_LIST_FOR_CHAT,
    GET_LEAVE_INFO,
    GET_LEAVE_LIST,
    GET_USER_INFO,
    GET_USERS_LIST,
    LOGIN_USER,
    LOGOUT_USER,
    REJECT_LEAVE, SEND_MESSAGE, SET_CHAT_SELECTION,
    UPDATE_PROFILE,
    UPLOAD_IMAGE_PROFILE
} from "./actionType";

export const loginUser = payload => ({
    type: LOGIN_USER,
    toasterString: `Waiting for Login Response.`,
    isHttpAction: true,
    url: '/auth/logIn',
    method: 'POST',
    body: payload,
});

export const getUserInfo = () => ({
    type: GET_USER_INFO,
    toasterString: `Waiting for User Information.`,
    isHttpAction: true,
    url: '/user/getUserInfo',
    method: 'GET',
});

export const logOutUser = () => ({
    type: LOGOUT_USER,
    toasterString: `Waiting for Logout Response.`,
    isHttpAction: true,
    url: '/user/logOut',
    method: 'GET',
});

export const applyToLeave = payload => ({
    type: APPLY_TO_LEAVE,
    toasterString: `Try to apply a leave.`,
    isHttpAction: true,
    url: '/leave/applyToLeave',
    method: 'POST',
    body: payload,
});

export const getLeaveList = payload => ({
    type: GET_LEAVE_LIST,
    toasterString: `Try to get leave list.`,
    isHttpAction: true,
    url: '/leave/getLeavesList',
    method: 'POST',
    body: payload,
});

export const getLeaveInfo = payload => ({
    type: GET_LEAVE_INFO,
    toasterString: `Try to get leave Information.`,
    isHttpAction: true,
    url: `/leave/getLeavesList/${payload.taskId || 0}`,
    method: 'POST',
    body: payload,
})

export const cancelLeave = payload => ({
    type: CANCEL_LEAVE,
    toasterString: `Try to cancel leave application.`,
    isHttpAction: true,
    url: '/leave/cancelLeave',
    method: 'POST',
    body: payload,
});

export const editLeave = payload => ({
    type: EDIT_LEAVE,
    toasterString: `Try to changes on leave application.`,
    isHttpAction: true,
    url: `/leave/editLeave`,
    method: 'POST',
    body: payload,
})

export const rejectLeave = payload => ({
    type: REJECT_LEAVE,
    toasterString: `Try to reject a leave application.`,
    isHttpAction: true,
    url: '/leave/rejectLeave',
    method: 'POST',
    body: payload,
});

export const approveLeave = payload => ({
    type: APPROVE_LEAVE,
    toasterString: `Try to approve a leave application.`,
    isHttpAction: true,
    url: `/leave/approveLeave`,
    method: 'POST',
    body: payload,
})

export const uploadImageProfile = payload => ({
    type: UPLOAD_IMAGE_PROFILE,
    toasterString: `Try to upload a profile picture.`,
    isHttpAction: false,
    isFirebaseBucketAction: true,
    path: `profile/${payload.userId}`,
    body: payload,
});

export const updateProfile = payload => ({
    type: UPDATE_PROFILE,
    toasterString: `Try to update profile.`,
    isHttpAction: true,
    url: `/user/updateUserInfo`,
    method: 'PATCH',
    body: payload,
});

export const getUsersList = payload => ({
    type: GET_USERS_LIST,
    toasterString: `Try to get users list.`,
    isHttpAction: true,
    url: '/user/getUsersList',
    method: 'POST',
    body: payload,
});

export const getAllEmployeeListForChat = () => ({
    type: GET_EMPLOYEE_LIST_FOR_CHAT,
    toasterString: `Try to get employeeList list.`,
    isHttpAction: true,
    url: '/user/getAllEmployeeListForChat',
    method: 'GET',
});

export const getEmployeeInfo = payload => ({
    type: GET_EMPLOYEE_INFO,
    toasterString: `Try to get employee information.`,
    isHttpAction: true,
    url: `/user/getEmployeeInfo`,
    method: 'POST',
    body: payload,
});

export const chatSelection = payload => ({
    type: SET_CHAT_SELECTION,
    toasterString: null,
    payload,
});

export const sendMessage = payload => ({
    type: SEND_MESSAGE,
    isFirebaseRealTimeDataBaseAction: true,
    collectionName: `direct`,
    loader : false,
    payload,
})