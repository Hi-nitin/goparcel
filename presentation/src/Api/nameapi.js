

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getmyname',{
          credentials:'include'
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
       return result;
      } catch (error) {
        return null;
      }
    };

    fetchData();




export default fetchData;
