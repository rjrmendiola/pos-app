export interface User {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    username: string;
    email: string;
    password: string;
    lastlogin?: string;
  }