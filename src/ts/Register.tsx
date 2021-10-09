import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { APIHelper } from "./api-helper";

export const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [waiting, setWaiting] = useState(false);
    const [hadError, setHadError] = useState(false);
    const [hadInvalidCredentials, setHadInvalidCredentials] = useState(false);

    const handleRegister = async () => {
        setWaiting(true);
        setHadError(false);
        setHadInvalidCredentials(false);
        const response = await APIHelper.register({username, email, password});
        setWaiting(false);
        if (!response.success) {
            setHadError(true);
        } else if (!response.valid) {
            setHadInvalidCredentials(true);
        } else {
            document.cookie = `Auth=${response.token};max-age=${60 * 60 * 24 * 365};domain=markaronin.com`;
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            if (redirect) {
                window.location.href = redirect;
            }
        }
    }

    const loginOnEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && [username, email, password].every(val => val.length > 0)) {
            handleRegister()
        }
    }

    return <div>
        <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)} 
            onKeyDown={loginOnEnterPress} 
        />
        <br />
        <input 
            type="text" 
            placeholder="Email" 
            value={email} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.currentTarget.value)} 
            onKeyDown={loginOnEnterPress} 
        />
        <br />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} 
            onKeyDown={loginOnEnterPress} 
        />
        <br />
        <button onClick={() => handleRegister()}>Register</button>
    </div>
}