import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Map = (props) => {
    const navigate = useNavigate();

    const socket = io('http://localhost:3000/');
    const fetchCookie = async () => {
        try {
            const response = await fetch('http://localhost:3000/get-cookie', {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent with the request
            });
            const data = await response.json();
            if (data) {
                return data;
            }
        } catch (error) {
            console.error('Error fetching cookie:', error);
        }
    };
    const [showbtn, setbtn] = useState(false)
    useEffect(() => {

        socket.on('sendreceiverlocation', async (data) => {
            const token = await fetchCookie();
            try {
                const decodedToken = jwtDecode(token.cookieValue);
                if (data == decodedToken.userId) {
                    setbtn(true)
                }

            } catch (e) {
                alert('token error login again')
            }

        });

        return () => {
            socket.off('updateClients');
        };
    }, []);

const gedaman=(idd)=>{
    sessionStorage.setItem('mydeliveryguyid', idd); 
navigate('/prl')

}

    return (
        <>
            {/* <Navbar /> */}


            <div className="information">
                <div style={{ color: 'black', padding: '20px', backgroundColor: 'white' }}>
                    <div className="flex flex-wrap justify-center p-5 gap-7">
                        <div className="max-w-[200px] rounded overflow-hidden shadow-lg">
                            <img className="w-full" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174456/profile-clipart-md.png" alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <p className="text-gray-700 text-base">
                                    Name : {props.name}
                                </p>
                                <p className="text-gray-700 text-base">
                                    Email : {props.email}
                                </p>
                                <p className="text-gray-700 text-base">
                                    Phone : {props.phone}
                                </p>

                            </div>
                            {
                                showbtn && <button
                                    onClick={() => gedaman(props.id)}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        width: '100%',
                                        marginTop: 'auto',
                                        transition: 'background-color 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                                >
                                    Provide Receiver Location
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Map;
