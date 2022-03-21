export const authenticate=(response,next)=>{
    if(window!=="undefined"){
        //เก็บข้อมูลลง session
        // sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.email))
        sessionStorage.setItem("role",JSON.stringify(response.data.role))
    }
    next()
}
// export const getToken=()=>{
//     if(window!=="undefined"){
//         if(sessionStorage.getItem("token")){
//             return JSON.parse(sessionStorage.getItem("token"))
//         }
//         else{
//             return false
//         }
//     }
// }
export const getUser=()=>{
    if(window!=="undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }
        else{
            return false
        }
    }
}
export const getRole=()=>{
    if(window!=="undefined"){
        if(sessionStorage.getItem("role")){
            return JSON.parse(sessionStorage.getItem("role"))
        }
        else{
            return false
        }
    }
}
export const logout=(next)=>{
    if(window!=="undefined"){
        // sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("role")
    }
    next()
}