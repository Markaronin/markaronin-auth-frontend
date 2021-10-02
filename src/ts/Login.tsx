import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { APIHelper } from "./api-helper";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [waiting, setWaiting] = useState(false);
    const [hadError, setHadError] = useState(false);
    const [hadInvalidCredentials, setHadInvalidCredentials] = useState(false);

    const handleLogin = async () => {
        setWaiting(true);
        setHadError(false);
        setHadInvalidCredentials(false);
        const response = await APIHelper.login({username, password});
        setWaiting(false);
        if (!response.success) {
            setHadError(true);
        } else if (!response.valid) {
            setHadInvalidCredentials(true);
        } else {
            document.cookie = `Auth=${response.token};max-age=${60 * 60 * 24 * 365};domain=markaronin.com`;
            // TODO - do a redirect here
        }
    }

    const loginOnEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && [username, password].every(val => val.length > 0)) {
            handleLogin()
        }
    }

    return <div>
        <input 
            type="text" 
            placeholder="Username/Email" 
            value={username} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)} 
            onKeyDown={loginOnEnterPress}
            disabled={waiting} 
        />
        <br />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} 
            onKeyDown={loginOnEnterPress} 
            disabled={waiting}
        />
        <br />
        <button onClick={() => handleLogin()} disabled={waiting}>{waiting ? "Waiting..." : "Login"}</button>
        {hadError && <div>Error while logging in</div>}
        {hadInvalidCredentials && <div>Invalid credentials</div>}
    </div>
}