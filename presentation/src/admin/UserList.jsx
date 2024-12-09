// src/components/AdminPanel.js
import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (isLoggedIn) {
            fetchUsers();
            fetchDocuments();
        }
    }, [isLoggedIn]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/documents');
            if (!response.ok) {
                throw new Error('Failed to fetch documents');
            }
            const data = await response.json();
            setDocuments(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            fetchUsers(); // Refresh the list
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setEditingUser(null);
        setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            fetchUsers(); // Refresh the list after update
            setEditingUser(null); // Clear editing user
            setFormData({ firstName: '', lastName: '', email: '', phone: '' }); // Reset form
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyDocument = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/verify/${userId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to verify user');
            }
            const rko= await response.json();
           if(rko.message=='User verified'){
alert('verified');
fetchUsers();
fetchDocuments();

           }
           
        } catch (err) {
            setError(err.message);
        }
    };

    const styles = {
        adminPanel: {
            maxWidth: '800px',
            margin: 'auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            textAlign: 'center',
            color: '#333',
            fontSize: '24px',
            marginBottom: '20px',
        },
        errorMessage: {
            color: '#f44336',
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: 'bold',
        },
        loginContainer: {
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '8px',
            fontWeight: 'bold',
        },
        input: {
            marginBottom: '16px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            transition: 'border 0.3s',
        },
        submitButton: {
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        userTable: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        tableHeader: {
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        tableCell: {
            border: '1px solid #ddd',
            padding: '12px',
            textAlign: 'left',
        },
        deleteButton: {
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        editButton: {
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        editForm: {
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
        },
        logoutButton: {
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.adminPanel}>
            {!isLoggedIn ? (
                <div style={styles.loginContainer}>
                    <h2 style={styles.heading}>Login</h2>
                    {loginError && <p style={styles.errorMessage}>{loginError}</p>}
                    <form onSubmit={handleLogin} style={styles.form}>
                        <label style={styles.label}>Username</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" style={styles.submitButton}>Login</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1 style={styles.heading}>Admin Panel</h1>
                    <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    {error && <p style={styles.errorMessage}>{error}</p>}

                    {editingUser && (
                        <div style={styles.editForm}>
                            <h2>Edit User</h2>
                            <form onSubmit={handleUpdateUser}>
                                <label style={styles.label}>First Name</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                />
                                <label style={styles.label}>Last Name</label>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                />
                                <label style={styles.label}>Email</label>
                                <input
                                    style={styles.input}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                />
                                <label style={styles.label}>Phone</label>
                                <input
                                    style={styles.input}
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                />
                                <button type="submit" style={styles.submitButton}>Update User</button>
                            </form>
                        </div>
                    )}

                    <h2>Users</h2>
                    <table style={styles.userTable}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>ID</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>First Name</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Last Name</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Email</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Phone</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={styles.tableCell}>{user.id}</td>
                                    <td style={styles.tableCell}>{user.firstName}</td>
                                    <td style={styles.tableCell}>{user.lastName}</td>
                                    <td style={styles.tableCell}>{user.email}</td>
                                    <td style={styles.tableCell}>{user.phone}</td>
                                    <td style={styles.tableCell}>
                                        <button style={styles.editButton} onClick={() => handleEditClick(user)}>Edit</button>
                                        <button style={styles.deleteButton} onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>Documents</h2>
                    <table style={styles.userTable}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>ID</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Front Citizenship</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Back Citizenship</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Delivery ID</th>
                                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc.id}>
                                    <td style={styles.tableCell}>{doc.id}</td>
                                    <td style={styles.tableCell}>
                                        <img onClick={()=>{window.open(`http://localhost:3000/uploads/${doc.front_citizenship}`)} } src={`http://localhost:3000/uploads/${doc.front_citizenship}`} alt="Front Citizenship" width="100" />
                                    </td>
                                    <td style={styles.tableCell}>
                                        <img onClick={()=>{window.open(`http://localhost:3000/uploads/${doc.back_citizenship}`)}} src={`http://localhost:3000/uploads/${doc.back_citizenship}`} alt="Back Citizenship" width="100" />
                                    </td>
                                    <td style={styles.tableCell}>{doc.delivery_id}</td>
                                    <td style={styles.tableCell}>
                                        <button
                                            style={styles.submitButton}
                                            onClick={() => verifyDocument(doc.delivery_id)} 
                                        >
                                            Verify
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
