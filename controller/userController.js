import {UserApi} from "../api/userApi.js";
export default class UserController{

    user_api = new UserApi();

    async saveUser(userModel){
        this.user_api.signUp(userModel);
    }
}