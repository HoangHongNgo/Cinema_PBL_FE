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
  
  export const SetUserSession = (token) => {
    localStorage.setItem('token', token)
    // localStorage.setItem('username', JSON.stringify(username))
    // localStorage.setItem('id', JSON.stringify(id))
  }
  
  export const RemovedUserSession = () => {
    localStorage.removeItem('token')
    // localStorage.removeItem('username')
    // localStorage.removeItem('id')
}
  