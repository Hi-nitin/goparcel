const {Server} = require('socket.io');
const Demosocket=(ser)=>{
    const io = new Server(ser, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });

    let students = [];
    let teachers = [];
    let connectedUsers = {}; // To track connected users
    
    io.on('connection', (socket) => {
        console.log('New client connected');
    
        // Initialize user details
        connectedUsers[socket.id] = { students: [], teachers: [] };
    
        // Emit initial data
        socket.emit('data', { students, teachers });
    
        // Listen for adding student
        socket.on('addStudent', (student) => {
            students.push({ ...student, id: socket.id }); // Add user id to student
            connectedUsers[socket.id].students.push(student); // Track added student for this user
            io.emit('data', { students, teachers });
        });
    
        // Listen for adding teacher
        socket.on('addTeacher', (teacher) => {
           teachers.push({id:socket.id,...teacher});
             // Store teachers by user id
            connectedUsers[socket.id].teachers.push(teacher); // Track added teacher for this user
            io.emit('data', { students, teachers });
        });
    
        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            // Remove user students and teachers
            students = students.filter(student => student.id !== socket.id);
            delete teachers[socket.id];
            delete connectedUsers[socket.id];
    
            // Emit updated data
            io.emit('data', { students, teachers });
        });
    });
}

module.exports=Demosocket