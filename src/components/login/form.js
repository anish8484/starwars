import React from 'react';

const LoginForm = (props) => {
    return (
        <div>
            <h2 className="login">Login</h2>
            <div className="container">
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" value={props.username} onChange={props.handleInputChange} />
                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" value={props.password} onChange={props.handleInputChange} />
            </div>
            <div className="container" style={{backgroundColor:'#f0f0f0'}}>
                <button type="submit" onClick={props.handleLogin}>LOGIN</button>
                {props.error && (
                    <div className="error">
                        {'User not authorized.'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginForm;