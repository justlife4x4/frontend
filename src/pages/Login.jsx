import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPassword from '../components/auth/LoginPassword';
import ForgetPassword from '../components/auth/ForgetPassword';
import LoginOtp from '../components/auth/LoginOtp';

const Login = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const navigate = useNavigate();

    const redirect = () => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        navigate('./Dashboard', { replace: true });
        navigate(0);
    }

    useEffect(() => {
        accessToken && refreshToken && redirect();
    }, [accessToken, refreshToken]);

    const handleSuccess = (accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const handleOtpSuccess = () => {
        setShowForgetPassword(false);
        setShowPassword(false);
        setShowOtp(true);
    };

    const handleBack = (source) => {
        if (source === "FORGET_PASSWORD") {
            setShowOtp(false);
            setShowPassword(false);
            setShowForgetPassword(true);

        } else if (source === "LOGIN_PASSWORD") {
            setShowOtp(false);
            setShowForgetPassword(false);
            setShowPassword(true);
        }
    }

    return ( 
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7" style={{'borderRight': 'solid 1px #9e9f98'}}>
                    <img src='assets/img/photos/login.svg' alt="login" className='img-fluid'/>                  
                </div>
                <div className="col-md-5 contents">
                    {showPassword &&
                        <LoginPassword 
                            onSuccess={handleSuccess}
                            onBack={handleBack}/>
                    }

                    {showForgetPassword &&
                        <ForgetPassword 
                            onSuccess={handleOtpSuccess}
                            onBack={handleBack}/>
                    }

                    {showOtp &&
                        <LoginOtp 
                            onSuccess={handleSuccess}
                            onBack={handleBack}/>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Login;