import React, { useState } from 'react';
import './homeSection.css';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import swal from 'sweetalert2';
const HomeSection = () => {
  const navigate = useNavigate();
  // State to manage input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to manage form submission status
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Replace this URL with your actual server endpoint
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in request
        
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      // Check if the response is ok

      // Handle the response
      const result = await response.json();
console.log(result);
if(result.message=='Login successful'){
  setStatus('Success : ' + result.message); // Adjust based on the actual response
  navigate('/dashboard');

}

if(result.error=='Email not found'){
  new swal({
    title: "Email not found!",
    text: "",
    icon: "question",
   
  });
}
if(result.error=='Invalid password'){
  new swal({
    title: "Password incorrect!",
    text: "",
    icon: "warning",
   
  });
}
if(result.error=='Failed to login'){
  new swal({
    title: "FAiled to login!",
    text: "",
    icon: "question",
   
  });
}

    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <>
    <Navbar/>
        <div className='home-container bg-white flex'>
      <div className="service flex flex-col gap-3">
        <h1 className='font-extrabold'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            className='border border-black'
            type="email"
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            className='border border-black'
            type="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button className='hover:font-bold' type='submit'>Login</button>
        </form>
        {status && <p>{status}</p>} {/* Display the status message */}
      </div>
    </div>
    </>
  );
}

export default HomeSection;

// import React, { useState } from 'react';
// import './homeSection.css';
// import { useNavigate } from 'react-router-dom'; 
// import Navbar from './Navbar';

// const HomeSection = () => {
//   const navigate = useNavigate();
//   // State to manage input values
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState(''); // State to manage dropdown value
//   // State to manage form submission status
//   const [status, setStatus] = useState('');

//   // Handle input changes
//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);
//   const handleUserTypeChange = (e) => setUserType(e.target.value); // Handle dropdown change

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     try {
//       // Replace this URL with your actual server endpoint
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include cookies in request
        
//         body: JSON.stringify({ email, password, userType }), // Send email, password, and userType as JSON
//       });

//       // Check if the response is ok
//       const result = await response.json();
//       console.log(result);

//       if(result.message === 'Login successful') {
//         setStatus('Success: ' + result.message); // Adjust based on the actual response
//         navigate('/dashboard');
//       } else if (result.error) {
//         setStatus('Error: ' + result.error); // Display the error message
//       }

//     } catch (error) {
//       setStatus('Error: ' + error.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='home-container bg-white flex'>
//         <div className="service flex flex-col gap-3">
//           <h1 className='font-extrabold'>Login</h1>
//           <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
//             <input
//               className='border border-black'
//               type="email"
//               placeholder='Email'
//               value={email}
//               onChange={handleEmailChange}
//               required
//             />
//             <input
//               className='border border-black'
//               type="password"
//               placeholder='Password'
//               value={password}
//               onChange={handlePasswordChange}
//               required
//             />
//             <select
//               className='border border-black'
//               value={userType}
//               onChange={handleUserTypeChange}
//               required
//             >
//               <option value="" disabled>Select user type</option>
//               <option value="plumber">Plumber</option>
//               <option value="customer">Customer</option>
//             </select>
//             <button className='hover:font-bold' type='submit'>Login</button>
//           </form>
//           {status && <p>{status}</p>} {/* Display the status message */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default HomeSection;
