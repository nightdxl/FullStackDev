export function changeUserName(username) {
    console.log(username)

// ** 函数接收到 username 这个 object { username: "Daniel" } 之后（object 'username' 和 object 里面的 username 不是一回事），赋值给 userName

    return{
        type : "CHANGE_USER_NAME",
        userName: username
    }
}


export function changeAdmin(username) {
    console.log(username)

    return{
        type : "CHANGE_TO_ADMIN",
        userName: "Admin"
    }
}


export function log(status) {
    console.log(status.status)

    return{
        type : "LOG_IN_AND_OUT",
        userStatus: status
    }
}

