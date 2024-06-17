import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SubjectItem = ({ subject, onDelete, onEdit, onUpdate }) => {
    const handleCheckboxChange = () => {
        const updatedSubject = { ...subject, inStock: !subject.inStock };
        onUpdate(updatedSubject);
    };

    const itemStyle = {
        color: subject.inStock ? 'white' : 'gray', // Czarny kolor tekstu dla inStock true, szary dla false
    };

    return (
        <li style={itemStyle}>
            {subject.id}. {subject.name}
            <input
                type="checkbox"
                checked={subject.inStock}
                onChange={handleCheckboxChange} />
            In Stock
            <button className="delete-btn" onClick={() => onDelete(subject.id)}>Delete</button>
            <button className="edit-btn" onClick={() => onEdit(subject)}>Edit</button>
        </li>
    );
};

const SubjectList = ({ subjects, onDelete, onEdit }) => {
    return (
        <ul>
            {subjects.map(subject => (
                <SubjectItem key={subject.id} subject={subject} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </ul>
    );
};

const SubjectForm = ({ subject, setSubject, saveSubject, cancelEdit }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="New product"
                value={subject.name}
                onChange={(e) => setSubject({ ...subject, name: e.target.value })}
            />
            <label>
                <input
                    type="checkbox"
                    checked={subject.inStock}
                    onChange={(e) => setSubject({ ...subject, inStock: e.target.checked })}
                />
                In stock
            </label>
            <button onClick={saveSubject}>Save</button>
            {cancelEdit && <button onClick={cancelEdit}>Cancel</button>}
        </div>
    );
};

function App() {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState({ name: '', inStock: false });
    const [editingSubject, setEditingSubject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:5197/api/Subjects');
            console.log('Received subjects:', response.data);
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
            setError('Error fetching subjects');
        }
    };

    const addSubject = async () => {
        try {
            const response = await axios.post('http://localhost:5197/api/Subjects', newSubject);
            setSubjects([...subjects, response.data]);
            setNewSubject({ name: '', inStock: false });
        } catch (error) {
            console.error('Error adding subject:', error);
            setError('Error adding subject');
        }
    };

    const updateSubject = async () => {
        try {
            await axios.put(`http://localhost:5197/api/Subjects/${editingSubject.id}`, editingSubject);
            setSubjects(subjects.map(sub => (sub.id === editingSubject.id ? editingSubject : sub)));
            setEditingSubject(null);
        } catch (error) {
            console.error('Error updating subject:', error);
            setError('Error updating subject');
        }
    };

    const deleteSubject = async (id) => {
        try {
            await axios.delete(`http://localhost:5197/api/Subjects/${id}`);
            setSubjects(subjects.filter(subject => subject.id !== id));
        } catch (error) {
            console.error('Error deleting subject:', error);
            setError('Error deleting subject');
        }
    };

    const startEditing = (subject) => {
        setEditingSubject(subject);
    };

    const cancelEdit = () => {
        setEditingSubject(null);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Subjects</h1>
            {editingSubject ? (
                <SubjectForm
                    subject={editingSubject}
                    setSubject={setEditingSubject}
                    saveSubject={updateSubject}
                    cancelEdit={cancelEdit}
                />
            ) : (
                <SubjectForm
                    subject={newSubject}
                    setSubject={setNewSubject}
                    saveSubject={addSubject}
                />
            )}
            <SubjectList subjects={subjects} onDelete={deleteSubject} onEdit={startEditing} />
        </div>
    );
}

export default App;
