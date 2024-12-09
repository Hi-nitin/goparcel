// import React from 'react';
// import "./SignIn.css";
// import { useState } from 'react';
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const SignIn = () => {
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState(''); // Add phone state
//   const [gender, setGender] = useState([]);
//   const [password, setPassword] = useState('');
//   const [repassword, setRePassword] = useState('');
//   const guy='delivery';

//   const [Efn, setEfn] = useState();
//   const [Eln, setEln] = useState();
//   const [Eps, setEps] = useState();
//   const [Eps2, setEps2] = useState();
//   const [Eps3, setEps3] = useState();
//   const [Eps4, setEps4] = useState();
//   const [Ere, setEre] = useState();
//   const [Eem, setEem] = useState();
//   const [Eph, setEph] = useState();
//   const [Eph2, setEph2] = useState();
//   // Add phone error state

//   const [dis, setDis] = useState('none');
//   const [dis2, setDis2] = useState('none');
//   const [dis3, setDis3] = useState('none');
//   const [dis4, setDis4] = useState('none');
//   const [dis5, setDis5] = useState('none');
//   const [dis6, setDis6] = useState('none');
//   const [dis7, setDis7] = useState('none');
//   const [dis8, setDis8] = useState('none');
//   const [dis9, setDis9] = useState('none'); 
//   const [dis10, setDis10] = useState('none');
//   // Add phone error display state
//   const navigate = useNavigate(); // Initialize useNavigate
//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       firstname,
//       lastname,
//       email,
//       phone, // Include phone in form data
//       password,
//       repassword,
//       guy
      
//     };

//     try {
//       const response = await fetch('http://localhost:3000/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       setDis('none');
//       setDis2('none');
//       setDis3('none');
//       setDis4('none');
//       setDis5('none');
//       setDis6('none');
//       setDis7('none');
//       setDis8('none');
//       setDis9('none'); // Reset phone error display state
//       setDis10('none'); 
//       if (result.msg === 'Email already exists') {
//         setEem('Email already exists'); 
//         setDis8();
//       }

//       if (result.msg === 'signup') {
//         console.log('successful');
//         alert('signup successfull')
//         // navigate('/signup')
//       }

//       result.errors !== undefined ? result.errors.map((val) => {
//         if (val.msg === 'Password should be at least 6 characters long') {
//           setEps(val.msg);
//           setDis();
//         }
//         if (val.msg === 'Password must contain a number') {
//           setEps2(val.msg);
//           setDis2();
//         }
//         if (val.msg === 'Password must contain an uppercase letter') {
//           setEps3(val.msg);
//           setDis3();
//         }
//         if (val.msg === 'First name should contain only letters') {
//           setEfn(val.msg);
//           setDis5();
//         }
//         if (val.msg === 'Last name should contain only letters') {
//           setEln(val.msg);
//           setDis6();
//         }
//         if (val.msg === 'Password must contain a lowercase letter') {
//           setEps4(val.msg);
//           setDis4();
//         }
//         if (val.msg === 'Passwords do not match') {
//           setEre(val.msg);
//           setDis7();
//         }
//         if (val.msg === 'Phone number is required') {
//           setEph(val.msg);
//           setDis9();
//         }
//         if (val.msg === 'Invalid phone number') {
//           setEph2(val.msg);
//           setDis10();
//         }
        

//       }) : null;

//     } catch (error) {
//       console.log(error);
//       alert('Error submitting form. Please try again later.');
//     }
//   };
//   const handleDeliverySignup = () => {
//     navigate('/signup'); // Redirect to the delivery signup page
//   };
//   return (
//     <>
//       <Navbar />
//       <form onSubmit={handleSubmit}>
//         <div className='SignIn-Container bg-white flex'>
//           <div className="SignIn flex flex-col gap-3">
//             <h1>delivery guy signup</h1>
//             <input 
//               className='border border-black' 
//               onChange={(e) => setFirstname(e.target.value)} 
//               type="text" 
//               placeholder='First name'
//             />
//             <p style={{color: 'red', display: dis5}}>{Efn}</p>

//             <input 
//               className='border border-black' 
//               onChange={(e) => setLastname(e.target.value)} 
//               type="text" 
//               placeholder='Last name'
//             />
//             <p style={{color: 'red', display: dis6}}>{Eln}</p>

//             <input 
//               className='border border-black' 
//               onChange={(e) => setEmail(e.target.value)} 
//               type="email" 
//               placeholder='Email'
//             />
//             <p style={{color: 'red', display: dis8}}>{Eem}</p>

//             <input 
//               className='border border-black' 
//               onChange={(e) => setPhone(e.target.value)} 
//               type="text" 
//               placeholder='Phone number'
//             />
//             <p style={{color: 'red', display: dis9}}>{Eph}</p> {/* Phone error display */}
//             <p style={{color: 'red', display: dis10}}>{Eph2}</p> {/* Phone error display */}

//             <input 
//               className='border border-black' 
//               onChange={(e) => setPassword(e.target.value)} 
//               type="password" 
//               placeholder='Password'
//             />
//             <p style={{color: 'red', display: dis}}>{Eps}</p>
//             <p style={{color: 'red', display: dis2}}>{Eps2}</p>
//             <p style={{color: 'red', display: dis3}}>{Eps3}</p>
//             <p style={{color: 'red', display: dis4}}>{Eps4}</p>

//             <input 
//               className='border border-black' 
//               onChange={(e) => setRePassword(e.target.value)} 
//               type="password" 
//               placeholder='Re-enter Password'
//             />
//             <p style={{color: 'red', display: dis7}}>{Ere}</p>

//             <button type="submit">Sign up as delivery guy</button>

//             <div className='divider'></div>

//             <button 
//               type="button" 
//               className='btn-secondary' 
//               onClick={handleDeliverySignup} // Handle delivery signup click
//             >
//               Signup as customer
//             </button>
//           </div>
//         </div>
//       </form>
      
//     </>
//   );
// };

// export default SignIn;
import React, { useState } from 'react';
import "./SignIn.css";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const guy = 'delivery';

  const [Efn, setEfn] = useState('');
  const [Eln, setEln] = useState('');
  const [Eps, setEps] = useState('');
  const [Eps2, setEps2] = useState('');
  const [Eps3, setEps3] = useState('');
  const [Eps4, setEps4] = useState('');
  const [Ere, setEre] = useState('');
  const [Eem, setEem] = useState('');
  const [Eph, setEph] = useState('');
  const [Eph2, setEph2] = useState('');

  const [dis, setDis] = useState('none');
  const [dis2, setDis2] = useState('none');
  const [dis3, setDis3] = useState('none');
  const [dis4, setDis4] = useState('none');
  const [dis5, setDis5] = useState('none');
  const [dis6, setDis6] = useState('none');
  const [dis7, setDis7] = useState('none');
  const [dis8, setDis8] = useState('none');
  const [dis9, setDis9] = useState('none');
  const [dis10, setDis10] = useState('none');

  const [successMessage, setSuccessMessage] = useState(''); // Add state for success message
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      phone,
      password,
      repassword,
      guy,
    };

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Reset error states
      setDis('none');
      setDis2('none');
      setDis3('none');
      setDis4('none');
      setDis5('none');
      setDis6('none');
      setDis7('none');
      setDis8('none');
      setDis9('none');
      setDis10('none'); 

      // Reset error messages
      setEfn('');
      setEln('');
      setEps('');
      setEps2('');
      setEps3('');
      setEps4('');
      setEre('');
      setEem('');
      setEph('');
      setEph2('');

      if (result.msg === 'Email already exists') {
        setEem('Email already exists'); 
        setDis8('block');
      }

      if (result.msg === 'signup') {
        console.log('successful');
        setSuccessMessage('Signup successful!'); // Show success message

        // Clear all input fields
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRePassword('');

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }

      if (result.errors !== undefined) {
        result.errors.forEach((val) => {
          if (val.msg === 'Password should be at least 6 characters long') {
            setEps(val.msg);
            setDis('block');
          }
          if (val.msg === 'Password must contain a number') {
            setEps2(val.msg);
            setDis2('block');
          }
          if (val.msg === 'Password must contain an uppercase letter') {
            setEps3(val.msg);
            setDis3('block');
          }
          if (val.msg === 'First name should contain only letters') {
            setEfn(val.msg);
            setDis5('block');
          }
          if (val.msg === 'Last name should contain only letters') {
            setEln(val.msg);
            setDis6('block');
          }
          if (val.msg === 'Password must contain a lowercase letter') {
            setEps4(val.msg);
            setDis4('block');
          }
          if (val.msg === 'Passwords do not match') {
            setEre(val.msg);
            setDis7('block');
          }
          if (val.msg === 'Phone number is required') {
            setEph(val.msg);
            setDis9('block');
          }
          if (val.msg === 'Invalid phone number') {
            setEph2(val.msg);
            setDis10('block');
          }
        });
      }

    } catch (error) {
      console.log(error);
      alert('Error submitting form. Please try again later.');
    }
  };

  const handleDeliverySignup = () => {
    navigate('/signup'); // Redirect to the delivery signup page
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className='SignIn-Container bg-white flex'>
          <div className="SignIn flex flex-col gap-3">
            <h1>Delivery Guy Signup</h1>
            <input 
              className='border border-black' 
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)} 
              type="text" 
              placeholder='First name'
            />
            <p style={{color: 'red', display: dis5}}>{Efn}</p>

            <input 
              className='border border-black' 
              value={lastname}
              onChange={(e) => setLastname(e.target.value)} 
              type="text" 
              placeholder='Last name'
            />
            <p style={{color: 'red', display: dis6}}>{Eln}</p>

            <input 
              className='border border-black' 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder='Email'
            />
            <p style={{color: 'red', display: dis8}}>{Eem}</p>

            <input 
              className='border border-black' 
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              type="text" 
              placeholder='Phone number'
            />
            <p style={{color: 'red', display: dis9}}>{Eph}</p>
            <p style={{color: 'red', display: dis10}}>{Eph2}</p>

            <input 
              className='border border-black' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder='Password'
            />
            <p style={{color: 'red', display: dis}}>{Eps}</p>
            <p style={{color: 'red', display: dis2}}>{Eps2}</p>
            <p style={{color: 'red', display: dis3}}>{Eps3}</p>
            <p style={{color: 'red', display: dis4}}>{Eps4}</p>

            <input 
              className='border border-black' 
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)} 
              type="password" 
              placeholder='Re-enter Password'
            />
            <p style={{color: 'red', display: dis7}}>{Ere}</p>

            <button type="submit">Sign up as delivery guy</button>

            {successMessage && (
              <p style={{color: 'green', marginTop: '10px'}}>{successMessage}</p>
            )}

            <div className='divider'></div>

            <button 
              type="button" 
              className='btn-secondary' 
              onClick={handleDeliverySignup}
            >
              Signup as customer
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignIn;

