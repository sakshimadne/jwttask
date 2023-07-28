import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const URL = process.env.REACT_APP_URL;

   async function handleSignUp(e) {
     e.preventDefault()
     setLoading(true)
     try {
       const response = await axios({
         method: 'post',
         url: URL + '/api/auth/signup',
         withCredentials: true,
         data: userData,
       })
       if (response.data.success) {
         localStorage.setItem('user', JSON.stringify(response.data.data))
         navigate('/signin')
       }
       setLoading(false)
     } catch (error) {
       alert(error.response.data.message)
       setLoading(false)
     }
   }

  return (
    <div className='container'>
      <div className='card m-4'>
        <div className='card-body'>
          <form onSubmit={(e) => handleSignUp(e)}>
            <h5 className='card-title'>SignUp to our platform</h5>

            {/* name  */}
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Your Name
              </label>
              <input
                type='text'
                id='name'
                className='form-control'
                placeholder='user name'
                required
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
            {/* dob */}
            <div className='mb-3'>
              <label htmlFor='dob' className='form-label'>
                Date of Birth
              </label>
              <input
                type='date'
                id='dob'
                className='form-control'
                required
                value={userData.dob}
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
              />
            </div>
            {/* email */}
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Your email
              </label>
              <input
                type='email'
                id='email'
                className='form-control'
                placeholder='name@company.com'
                required
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            {/* password */}
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Your password
              </label>
              <input
                type='password'
                id='password'
                className='form-control'
                minLength='8'
                placeholder='••••••••'
                required
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>

            {/* confirm password */}
            <div className='mb-3'>
              <label htmlFor='confirmPassword' className='form-label'>
                Confirm password
              </label>
              <input
                type='password'
                id='confirmPassword'
                className='form-control'
                minLength='8'
                placeholder='••••••••'
                required
                value={userData.confirmPassword}
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                }
              />
            </div>

            {/* signUp button */}
            <button type='submit' className='btn btn-primary w-100'>
              Register new account
              {loading ? (
                <span
                  className='spinner-border spinner-border-sm ml-2'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : null}
            </button>

            {/* signIn */}
            <div className='mt-3 text-center'>
              Already have an account?
              <Link to='/signin' className='text-primary'>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
