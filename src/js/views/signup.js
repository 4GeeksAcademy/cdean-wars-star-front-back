import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

const SignUp = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex align-items-center justify-content-center">
            <div className="d-flex justify-content-center" id="form_cont">
            
            <form>
            <h1 className="mb-5">Sign Up</h1>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@example.com"/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
            </div>
        </div>
	);
};

export default SignUp;