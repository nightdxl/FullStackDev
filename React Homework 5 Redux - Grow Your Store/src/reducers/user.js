const initialState = {
    username: 'Jasper',
    status: 'not_logged_in',
}


const user = (state = initialState, action) => {
    // console.log('=====', action)

    switch (action.type) {
        case 'CHANGE_USER_NAME': 
            return {
                ...state,                               // ...state 表示，一个新的 state
                username: action.userName.username,     // ** 当 type 匹配成功之后，再把这里的 username 赋值 action.userName.username，也就是 "Daniel"
            }

        case 'CHANGE_TO_ADMIN': 
            return {
                ...state,
                username: "Admin",
            }

        case 'LOG_IN_AND_OUT': 
            return {
                ...state,
                status: action.userStatus.status,
            }

        default:
            console.log('by default:', state.status)
            return state;
    }
}

export default user;
