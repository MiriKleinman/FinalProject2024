import { API } from '../Utils/api';
import axios from 'axios';
import User from '../interfaces/User';
class LoginService {
    login = async (userId: string, userPassword: string) => {
        var status: number = 0;
        await axios.get(`${API}User/LoginUser/${userId}/${userPassword}`)
            .then(response => {
                status = response.data;
                console.log(status, "status");
            })
        return status;
    }
    addUser = async (user: User, userId: string, password: string) => {
        var res: number = 0;
        await axios.post(`${API}User/AddUser/${userId}/${password}`, user)
            .then(response => {
                res = response.data;
                console.log(res);
            })
        return res;
    }
    getUserById = async (userId: string, password: string) => {
        return (await axios.get(`${API}User/getUserById/${userId}/${password}`)).data;
    }
}
export default new LoginService();
