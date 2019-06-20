import Cookies from 'js-cookie'

 const userid = 'userId'

export function getUserId() {
  return Cookies.get(userid)
}

export function setUserId(userId) {
  return Cookies.set(userid, userId)
}

export function removeUSER_ID() {
  return Cookies.remove(userid)
}

export function setName(userName){
  return Cookies.set('userName',userName)
}
export function getName(){
  return Cookies.get('userName')
}
