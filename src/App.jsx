import { useEffect, useState } from 'react'

import './App.css'

import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

import { v4 as uuidv4 } from "uuid";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const copyText = async (text) => {
    await navigator.clipboard.writeText(String(text));
    toast('🦄 Copied to clipboard!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });

  }


  const [showPassword, setshowPassword] = useState(false);

  const toggleshow = () => {
    setshowPassword(prev => !prev);
  }

  const [form, setform] = useState({ site: "", username: "", password: "" })

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }


  const [passwordarray, setpasswordarray] = useState([]);

  // first we need to read already saved password using parse (useEffect ) when the page load first time

  useEffect(() => {
    const fetchPassword = async() => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL);
        const data = await response.json();
        setpasswordarray(data);
      } catch (error) {
        console.log("Failed to fetch data form database", error);
      }
    }
    fetchPassword();

  }, []);


  // now if we add a new password the we have to same them into loacalstorage;

  const savepassword = async() => {
    let newpasswordPayload = { ...form, id: uuidv4() };
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newpasswordPayload),
      });

      const data = await response.json();
      if (data.success) {
        setpasswordarray([...passwordarray, newpasswordPayload]);
        setform({ site: "", username: "", password: "" });
        toast('🦄 Password saved scuccessfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      }
    } catch (error) {
      console.log("Faile to save data to databases", error);
    }

  };

  const handleeEdit = async (id) => {

    setform(passwordarray.filter(item => item.id === id)[0]);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (data.success) {
        let editedpasswords = passwordarray.filter(item => item.id !== id);
        setpasswordarray(editedpasswords);
        toast('🦄 Edit your Password!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log("Failed to delete data from databases", error);
    }
  }

  const handleDelete = async (id) => {
    let isconfirm = confirm("Do you want to delete this Password ? ");
    if (isconfirm) {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await response.json();
        if (data.success) {
          let editedpasswords = passwordarray.filter(item => item.id !== id);
          setpasswordarray(editedpasswords);
          toast('🦄 Password Deleted scuccessfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });


        }
      } catch (error) {
        console.log("Failed to delete data from databases", error);
      }
    }
  }




  return (
    <>
      <Navbar />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />


      <Manager />
      <Footer />




      <div className="container mx-auto flex flex-col items-center min-h-[85vh]">
        <div className="headings m-4 text-4xl">
          <h1><span className='text-green-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-700'>OP/&gt;</span></h1>
          <h2>Your Own Password Manager</h2>
        </div>

        <div className="inputs flex flex-col w-full items-center md:w-[80%] lg:w-[60%]">
          <input onChange={handlechange} value={form.site} name='site' placeholder='Enter the website name' className='border border-green-950 rounded-full w-full  outline-none p-2' type="text" />

          <div className='w-[80%] flex flex-col justify-between items-center gap-4 my-4 md:flex-row md:flex-1'>
            <input onChange={handlechange} value={form.username} name='username' placeholder='Enter your username' className='border border-green-950 rounded-full outline-none p-2 w-full flex-1' type="text" />
            <div className='relative w-full md:w-1/2'>
              <input onChange={handlechange} value={form.password} name='password' placeholder='Enter password' className='border border-green-950 rounded-full outline-none p-2 px-8 w-full' type={showPassword ? "text" : "password"} />
              <span className="absolute right-0 top-2 z-10 cursor-pointer px-2" onClick={toggleshow}><i className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i></span>
            </div>

          </div>
          <button onClick={savepassword} className='bg-green-500 flex w-fit justify-center items-center rounded-full p-2 hover:bg-green-700 transition-colors'>
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover">
            </lord-icon>Add Password
          </button>


        </div>

        <div className='my-4 w-full max-h-[50vh] overflow-y-scroll'>
          <h1 className='font-bold'>Your Passwords</h1>

          {passwordarray.length === 0 && <div>No Password to show</div>}
          {passwordarray.length !== 0 && <div className='w-full overflow-x-scroll'>
            <table className="table-auto my-8 rounded-md overflow-hidden w-full">
              <thead className='bg-green-800' >
                <tr>
                  <th>Site</th>
                  <th>username</th>
                  <th>password</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                { passwordarray.map((item, index) => {
                  return <tr key={index}>
                    <td className='py-2 px-4 break-all'>{item.site} <span className='cursor-pointer' onClick={() => copyText(item.site)}><i className="fa-solid fa-copy"></i></span></td>
                    <td className='py-2 px-4 break-all'>{item.username} <span className='cursor-pointer' onClick={() => copyText(item.username)}><i className="fa-solid fa-copy"></i></span></td>
                    <td className='py-2 px-4 break-all'>{item.password} <span className='cursor-pointer' onClick={() => copyText(item.password)}><i className="fa-solid fa-copy"></i></span></td>

                    <td>
                      <span className='mx-2 cursor-pointer text-center' onClick={() => handleeEdit(item.id)} >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          stroke="bold"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className='mx-2 cursor-pointer text-center' onClick={() => handleDelete(item.id)}><lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        stroke="bold"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon></span>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
          }
        </div>



      </div>

    </>
  )
}

export default App
