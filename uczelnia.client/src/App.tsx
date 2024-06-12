import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Subjects {
    id: number;
    name: string;
    inStock: boolean; // Poprawione: bool na boolean
    // inne w³aœciwoœci
}

function App() {
    const [subjects, setSubjects] = useState<Subjects[]>([]);
    const [newSubjectName, setNewSubjectName] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('/api/Subjects');

            console.log('Received subjects:', response.data);
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const addSubject = async () => {
        try {
            const response = await axios.post('/api/Subjects', { name: newSubjectName });
            setSubjects([...subjects, response.data]);
            setNewSubjectName('');
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    const deleteSubject = async (id: number) => {
        try {
            await axios.delete(`/api/Subjects/${id}`);
            setSubjects(subjects.filter(subject => subject.id !== id));
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <div>
            <h1>Subjects</h1>
            <ul>
                {subjects.map(subject => (
                    <li key={subject.id}>
                        {subject.name}
                        <button onClick={() => deleteSubject(subject.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
            />
            <button onClick={addSubject}>Add Subject</button>
        </div>
    );
}

export default App;
