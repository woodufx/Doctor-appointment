import {useSelector} from 'react-redux';

export function useAuth() {
    const {email, token, id} = useSelector((state: any) => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}
