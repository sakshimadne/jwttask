import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const URL = process.env.REACT_APP_URL;

  async function handleSignIn(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios({
        method: 'post',
        url: URL + '/api/auth/signin',
        withCredentials: true,
        data: credentials,
      })
      console.log(response.data) 
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
        navigate('/')
      }
      setLoading(false)
    } catch (error) {
      alert(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <div className='card bg-white shadow rounded m-4 p-4'>
        <form onSubmit={(e) => handleSignIn(e)}>
          <h5 className='font-weight-medium'>Signin to our platform</h5>

          <div className='form-group'>
            <label htmlFor='email'>Your email</label>
            <input
              type='email'
              name='email'
              id='email'
              className='form-control'
              placeholder='name@company.com'
              required
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Your password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='form-control'
              required
              minLength='8'
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

        

          <button type='submit' className='btn btn-primary w-100'>
            Login to your account
            {loading ? (
              <div className='spinner-border spinner-border-sm' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : null}
          </button>

          <div className='form-group'>
            Not registered?{' '}
            <Link to='/signup' className='text-primary'>
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
