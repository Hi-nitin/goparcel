// components/StatusList.js
import React, { useEffect, useState } from 'react';
import Navbar from './navbar2';

const StatusList = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch('http://localhost:3000/merostatus',{
          credentials:'include'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatuses(data);
        console.log(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    header: {
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    headerCell: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px',
      textAlign: 'left',
    },
    cell: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    loading: {
      textAlign: 'center',
      fontSize: '20px',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      fontSize: '20px',
    },
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return { color: 'green' };
      case 'In Transit':
        return { color: 'orange' };
      case 'pending':
        return { color: 'blue' };
      case 'Returned':
        return { color: 'red' };
      default:
        return { color: 'black' };
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <>
    <Navbar/>
    
    <div style={styles.container}>
      <h1 style={styles.header}>Status List</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Parcel</th>
            <th style={styles.headerCell}>Receiver</th>
            <th style={styles.headerCell}>Status</th>
            <th style={styles.headerCell}>Your delivery guy</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <tr key={status._id}>
              <td style={styles.cell}>{status.parcelDescription}</td>
              <td style={styles.cell}>{status.receiverName}</td>
              <td style={{ ...styles.cell, ...getStatusStyle(status.status) }}>
                {status.status}
              </td>
              <td style={styles.cell}>
                {status.deliveryFirstName} {status.deliveryLastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    
</>
  );
};

export default StatusList;
