// import React, { useState } from 'react';
// import MapComponent from './deliveryMap';
// import Navbar from './navbar3';
// const deliveryCompo = () => {
//     const [location, setLocation] = useState(null);
//     const [error, setError] = useState(null);
//     const [verify,setverify]=useState()
//     const[loading,setLoading]=useState()

//     const handleGetLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setLocation({ latitude, longitude });
//                     sendLocationToServer(latitude, longitude);
//                 },
//                 (err) => {
//                     setError('Unable to retrieve location');
//                 }
//             );
//         } else {
//             setError('Geolocation is not supported by this browser.');
//         }
//     };

//     const sendLocationToServer = async (latitude, longitude) => {
//         try {
//             const response = await fetch('http://localhost:3000/saveLocation', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ latitude, longitude }),
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             console.log('Server response:', data);
//         } catch (error) {
//             console.error('Error sending location to server:', error);
//         }
//     };


    
//   if(!loading){
//     return (
//         <>
//          <Navbar/>

//          loading...

//         </>
//     )
//   }

//     return (
//         <>
    
           
//             {verify &&    <MapComponent />}
             
//         </>
//     );
// };

// export default deliveryCompo;



import React, { useState, useEffect } from 'react';
import MapComponent from './deliveryMap';
import Navbar from './navbar3';

const DeliveryCompo = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [verify, setVerify] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState({ frontCitizenship: null, backCitizenship: null });
    const [hasUploadedDocuments, setHasUploadedDocuments] = useState(false);




    const containerStyle = {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        margin: '0 auto',
    };

    const headingStyle = {
        color: '#333',
        marginBottom: '20px',
        fontSize: '22px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        display: 'block',
        margin: '10px auto',
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        width: '80%',
        backgroundColor: '#f9f9f9',
        color: '#333',
    };

    const buttonStyle = {
        padding: '12px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px',
    };


    useEffect(() => {
        handleGetLocation();
        checkUserVerification();
    }, []);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (err) => {
                    setError('Unable to retrieve location');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    };

    const checkUserVerification = async () => {
        try {
            const response = await fetch('http://localhost:3000/checkVerification', {
                credentials: 'include'
            });
            const data = await response.json();
            setVerify(data.verify);

            // If verify is 0, check if the user has uploaded documents
            if (data.verify === 0) {
                const documentResponse = await fetch('http://localhost:3000/document-uploads-check', {
                    credentials: 'include'
                });
                const documentData = await documentResponse.json();
                setHasUploadedDocuments(documentData.hasDocuments);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error checking user verification:', error);
            setLoading(false);
        }
    };

    const handleDocumentUpload = (event) => {
        const { name, files: fileList } = event.target;
        if (fileList.length > 0) {
            setFiles(prevFiles => ({
                ...prevFiles,
                [name]: fileList[0]
            }));
        }
    };

    const uploadDocuments = async () => {
        const formData = new FormData();
        formData.append('frontCitizenship', files.frontCitizenship);
        formData.append('backCitizenship', files.backCitizenship);
        formData.append('deliveryId', '1'); // Replace with actual delivery ID

        try {
            const response = await fetch('http://localhost:3000/upload-documents', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                alert('Documents uploaded successfully!');
                // Optionally check again for document status
                setHasUploadedDocuments(true);
            } else {
                alert('Failed to upload documents.');
            }
        } catch (error) {
            console.error('Error uploading documents:', error);
            alert('Error uploading documents.');
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                loading...
            </>
        );
    }

    return (
        <>
            <Navbar />
            {verify === 1 ? (
                <MapComponent />
            ) : verify === 0 ? (
                <div>
                    {hasUploadedDocuments ? (
                        <h3>Waiting for document verification...</h3>
                    ) : (
                        // <div>
                        //     <h3>Please upload your documents for verification:</h3>
                        //     <input type="file" name="frontCitizenship" onChange={handleDocumentUpload} />
                        //     <input type="file" name="backCitizenship" onChange={handleDocumentUpload} />
                        //     <button onClick={uploadDocuments}>
                        //         Upload Documents
                        //     </button>
                        // </div>

                        <div style={containerStyle}>
                        <h3 style={headingStyle}>Please upload your documents for verification:</h3>
                        <h2>front citizenship photo</h2>
                        <input 
                            type="file" 
                            name="frontCitizenship" 
                            onChange={handleDocumentUpload} 
                            style={inputStyle}
                        />
                         <h2>back citizenship photo</h2>
                        <input 
                            type="file" 
                            name="backCitizenship" 
                            onChange={handleDocumentUpload} 
                            style={inputStyle}
                        />
                        <button 
                            onClick={uploadDocuments} 
                            style={buttonStyle}
                        >
                            Upload Documents
                        </button>
                    </div>
                    )}
                </div>
            ) : (
                <div>User verification status unknown.</div>
            )}
            {error && <div>{error}</div>}
        </>
    );
};

export default DeliveryCompo;
