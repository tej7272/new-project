import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({children , authentication = true}) => {

    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate();
    const [loader, setLoader] = React.useState(true);

    React.useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false);
      
    }, [navigate, authStatus, authentication])

    if(loader){
        return <div>Loading...</div>
    }
    

    return (
        <div>{children}</div>
    )
}


export default ProtectedRoute;