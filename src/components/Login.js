import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notecontext } from "../App";


const Login = () => {
    const context = useContext(notecontext)
    const {showAlert} = context
    const [credential,setCredentials] = useState({email: "", password: ""})
    const history = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credential.email,password: credential.password}),
          });
          const json = await response.json()
          if(json.success){
            localStorage.setItem('token',json.authtoken)
            showAlert("Successfully SignedIn","success")
            history("/Home")
          }
          else{
            showAlert("Invalid Credentials","warning")
          }
    }
    const onchange = (e) =>{
        setCredentials({...credential,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <section className="container">
        <div
          className="px-4 py-5 px-md-5 h-100 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="email" name="email" value={credential.email} onChange={onchange} className="form-control" />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init  className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          name="password"
                          value={credential.password}
                          onChange={onchange}
                        />
                        <label className="form-label"  htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example33"
                          
                        />
                        <label className="form-check-label" htmlFor="form2Example33">
                          Subscribe to our newsletter
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-block mb-4"
                          
                        >
                          Login
                        </button>
                      </div>

                      <div className="text-center">
                        <p>or sign up with:</p>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-google"></i>
                        </button>

                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>

                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-github"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
