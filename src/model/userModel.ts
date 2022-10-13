export class User
{
    id:string='';
    firstName:string='';
    lastName:string='';
    emailAddress:string='';
    password:string='';

    constructor(id:string,firstName:string,lastName:string,emailAddress:string,password:string)
    {
        this.id=id;
        this.firstName=firstName;
        this.lastName = lastName;
        this.emailAddress=emailAddress;
        this.password=password;    
    }
}