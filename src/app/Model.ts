export interface ILogin {
    ID: any;
    accessToken: any;
    refreshToken: any;
    issueDate: any;
    expireDate: any;
    response: any;

}

export interface ISignup {
    id: any;
    account: any;
    name: any;
    lname: any;
    phone: any;
    email: any;
    pass: any;

}

export interface Iprovince {
    Id: any;
    Name: any;
}
export interface Idistrict {
    Id: any;
    Name: any;
}
export interface Icity {
    Id: any;
    Name: any;
}

export interface Idevice {
    id: any;
    macaddres: any;
    name: any;
    city: any;
    cityname: any;
    street: any;
    building: any;
    idleday: any;
    rechargequantity: any;
    cyclefrom: any;
    cycleto: any;
    quantityused: any;
    remainingquantity: any;
    userstatus: any;
    adminstatus: any;


}
export interface Iadmindevice {
    id: any;
    macaddres: any;
    name: any;

    cityname: any;
    street: any;
    building: any;
    idleday: any;
    rechargequantity: any;
    cyclefrom: any;
    cycleto: any;
    quantityused: any;
    remainingquantity: any;
    userstatus: any;
    adminstatus: any;


}

export interface Iwater {

    data: any;
}
export interface Itubidity {

    data: any;

}
export interface Icategory {
    name: any;
}
export interface IyearsChart {
    water: Iwater[];
    turbidity: Itubidity[];
    category: Icategory[];
}
export interface Idaily {
    Time: any;
    watervalue: any;
    turbidityvalue: any;
}

export interface Inotification {
    id: any;
    deviceid: any;
    text: any;
    notiftype: any;
    isread: any;
    date: any;

}