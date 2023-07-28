import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutloading] = useState(false);
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      setLoading(false);
      const response = await axios({
        method: "get",
        url: URL + "/api/auth/user",
        withCredentials: true
      });

      if (response.data.success) {
        setUserData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      navigate("/signin");
      setLoading(false);
    }
  }

async function handleLogout() {
  setLogoutloading(true)
  try {
    const response = await axios({
      method: 'get',
      url: URL + '/api/auth/logout',
      withCredentials: true,
    })
    if (response.data.success) {
      localStorage.removeItem('user')
      navigate('/signin')
    }
    setLogoutloading(false)
  } catch (error) {
    setLogoutloading(false)
  }
}
      const contacts = [
        { name: 'John Doe', age: 35, status: 'Employed', active: true },
        { name: 'Jane Doe', age: 32, status: 'Unemployed', active: false },
        { name: 'Bob Smith', age: 28, status: 'Employed', active: true },
        { name: 'Mary Smith', age: 32, status: 'Employed', active: false },
        { name: 'John Smith', age: 28, status: 'Employed', active: true },
        { name: 'Jane Smith', age: 32, status: 'Employed', active: false },
        { name: 'Bob Doe', age: 28, status: 'Employed', active: true },
      ]
  return (
    <>
      <div className='container w-75'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Age</th>
              <th scope='col'>Status</th>
              <th scope='col'>Active</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.age}</td>
                <td>{contact.status}</td>
                <td>
                  {contact.active ? (
                    <span className='badge bg-success'>Active</span>
                  ) : (
                    <span className='badge bg-danger'>Not Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type='button'
          onClick={() => handleLogout()}
          className='btn btn-danger'
        >
          Logout
        </button>
      </div>
    </>
  )
}

export default Home;
