export class User {
  constructor(
    public username: string,
    public fullname: string,
    public password: string,
    public email: string,
    public ci: number,
    public type: string = 'normal',
    public roles: string = 'ROLE_USER'
  ) { }
}
