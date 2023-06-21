import { Button } from '@nextui-org/react'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const removeCookie = () => {

         cookie.remove('NOTEAPI_USER', {
            path: '/'
        });
        return navigate('/login');
    }

    return (
        <Button auto color="primary" onClick={removeCookie} rounded>
            Logout
        </Button>
    )
}


export default LogoutButton;