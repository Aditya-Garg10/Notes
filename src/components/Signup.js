import React,{useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { notecontext } from "../App";

const Signup = (props) => {
    const context = useContext(notecontext)
     const {showAlert} = context
    const [credential,setCredentials] = useState({name:"",email: "", password: ""})
    const history = useNavigate();
    const {name,email,password} = credential; 
   


    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("https://notes-backend-six-phi.vercel.app//auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password}),
          });
          const json = await response.json()
          if(json.success){
            localStorage.setItem('token',json.authtoken)
            showAlert("Successfully Signed In","success")
            history("/Home")
          }
          else{
           showAlert("Please Fill out the form given below","warning")
          //showAlert2(json.error,"danger")
          }

          
          
    }
    const onchange = (e) =>{
      setCredentials({...credential,[e.target.name]: e.target.value})
      console.log(credential)
    }
  return (
    <div>
      <section className="">
        <div
          className="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h4 className="my-5 display-3 fw-bold ls-tight">
                  Sign Up <br />
                  <span className="text-primary">Here</span>
                </h4>
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
                    <form onClick={handleSubmit}>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              name="name"
                              onChange={onchange}
                            />
                            <label className="form-label" htmlFor="name">
                              Full Name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          name="email"
                          onChange={onchange}
                          minLength={5}
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          onInput={onchange}
                          name="password"
                          minLength={5}
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          onChange={onchange}
                          name="password"
                        />
                        <label className="form-label" htmlFor="password">
                          Confirm Password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example33"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example33"
                        >
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
                          Sign up
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

export default Signup;
