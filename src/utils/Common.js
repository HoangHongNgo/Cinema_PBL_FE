// export const GetInfo = (email) => {
//     const userStr = localStorage.getItem(email)
//     if (!userStr) return
//     try {
//       if (userStr) return JSON.parse(userStr)
//       else return null
//     } catch (error) {
//       return null
//     }
//   }
  
export const SetEmailSession = (email) => {
    const name = localStorage.getItem(email)
    if (!name) return null
    else return name
}
export const GetEmailSession = (email) => {
    localStorage.setItem('email', email)
}
  export const GetToken = () => {
    return localStorage.getItem('token' || null)
  }
  
  export const SetUserSession = (user) => {
    console.log("user: ", user)
    localStorage.setItem('token', user.token)
    localStorage.setItem('username', user.username)
    localStorage.setItem('name', user.name)
    localStorage.setItem('userID', user.user_id)
  }
  
  export const RemovedUserSession = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('name')
    localStorage.removeItem('userID')
}
  