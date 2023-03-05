import React from "react";
import logo from "../Register/akkorhotel.png";
import {useForm} from 'react-hook-form';

function Login() {
    const {register} = useForm();
    return (
        <section>
            <div>
                <div className="register">
                    <div className="col-1">
                        <h2>Sign Up</h2>

                        <form id="form" className="flex flex-col">
                            
                            <input type="text" {...register("email")}placeholder="email"/>
                            <input type="text" {...register("password")}placeholder="password" />
                            

                            <button className="btn">Sign Up</button>
                        </form>
                    </div>
                    <div className="col-2">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;