
export class User{

  public id: number;
  public name: string;
  public mobileNumber: string;
  public email : string;
  public password: string;
  public role : string;
  public statusCd: string;
  public statusMsg : string;
  public authStatus : string;


  constructor(id?: number,name?: string, mobileNumber?: string, email?: string,  password?: string,role?: string,
      statusCd?:string,statusMsg?:string, authStatus?:string){
        this.id = id || 0;
        this.name = name || '';
        this.mobileNumber = mobileNumber || '';
        this.email = email || '';
        this.password = password || '';
        this.role = role || '';
        this.statusCd = statusCd || '';
        this.statusMsg = statusMsg || '';
        this.authStatus = authStatus || '';
  }

  constructorCustom(data : Partial<User>){
      this.id = data.id || 0;
      this.name = data.name || '';
      this.mobileNumber = data.mobileNumber || '';
      this.email = data.email || '';
      this.password = data.password || '';
      this.role = data.role || '';
      this.statusCd = data.statusCd || '';
      this.statusMsg = data.statusMsg || '';
      this.authStatus = data.authStatus || '';
}

}
