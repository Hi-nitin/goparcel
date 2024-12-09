import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

function demosocket() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        socket.on('data', ({ students, teachers }) => {
            setStudents(students);
            setTeachers(teachers);
        });

        return () => {
            socket.off('data');
        };
    }, []);

    const handleAddStudent = () => {
        socket.emit('addStudent', { name: studentName });
        setStudentName('');
    };

    const handleAddTeacher = () => {
        socket.emit('addTeacher', { name: teacherName });
        setTeacherName('');
    };

    return (
        <div>
            <h1>Student and Teacher Management</h1>
            <div>
                <h2>Students</h2>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student Name"
                />
                <button onClick={handleAddStudent}>Add Student</button>
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>{student.name+student.id}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Teachers</h2>
                <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Teacher Name"
                />
                <button onClick={handleAddTeacher}>Add Teacher</button>
                <ul>
                    {teachers.map((teacher, index) => (
                        <li key={index}>{teacher.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default demosocket;
