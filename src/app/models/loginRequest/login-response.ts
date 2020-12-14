export interface LoginResponse 
{
    authenticationToken?:string
    refreshToken?:string
    username?:string
    expireAt?:Date
}
