export function clearSession(props){
  localStorage.removeItem("auth")
  localStorage.removeItem('username')
  props.history.push("/")

}


export function apiErrors(){
  
}