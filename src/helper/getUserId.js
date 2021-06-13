import jwt from 'jwt-decode';
import { useHistory } from 'react-router';

export const GetUserId = () => {
    const history = useHistory();
    const token = localStorage.getItem('access_token')
    if(token){
        const user = jwt(token)
        return user.user_id
    }
    else{
        history.push('/login')
    }

}