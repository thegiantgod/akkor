import React from "react";
import logo from "../Register/akkorhotel.png";
import {useForm} from 'react-hook-form';

function Register() {
    const {register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <section>
            <div>
                <div className="register">
                    <div className="col-1">
                        <h2>Sign In</h2>

                        <form id="form" className="flex flex-col">
                            <input type="text" {...register("username")} placeholder="username" />
                            <input type="text" {...register("email")}placeholder="email"/>
                            <input type="text" {...register("password")}placeholder="password" />
                            <input type="text" {...register("confirmpwd")}placeholder="confirmpassword" />

                            <button className="btn">Sign In</button>
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

export default Register;