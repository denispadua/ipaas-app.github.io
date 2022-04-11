export interface UserData {
    "_id": String,
    "name": String,
    "email": String,
    "phone": String
}

export interface UserObject {
    size: number;
    user: UserData[];
}