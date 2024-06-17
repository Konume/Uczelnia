import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SubjectItem = ({ subject, onDelete, onEdit, onUpdate }) => {
    const handleCheckboxChange = () => {
        const updatedSubject = { ...subject, inStock: !subject.inStock };
        onUpdate(updatedSubject);
    };

    const itemStyle = {
        color: subject.inStock ? 'gray' : 'black',  // Czarny kolor tekstu dla inStock true, szary dla false
    };

    return (
        <li style={itemStyle}>
            {subject.id}. {subject.name}
            <input
                type="checkbox"
                checked={subject.inStock}
                onChange={handleCheckboxChange}
            />
            In Stock
            <button className="delete-btn" onClick={() => onDelete(subject.id)}>Delete</button>
            <button className="edit-btn" onClick={() => onEdit(subject)}>Edit</button>
        </li>
    );
};

const SubjectList = ({ subjects, onDelete, onEdit, onUpdate }) => {
    return (
        <ul>
            {subjects.map(subject => (
                <SubjectItem key={subject.id} subject={subject} onDelete={onDelete} onEdit={onEdit} onUpdate={onUpdate} />
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

    const addSubject = async (newSubject) => {
        try {
            const response = await axios.post('http://localhost:5197/api/Subjects', newSubject);
            setSubjects([...subjects, response.data]);
        } catch (error) {
            console.error('Error adding subject:', error);
            setError('Error adding subject');
        }
    };

    const updateSubject = async (subjectToUpdate) => {
        try {
            await axios.put(`http://localhost:5197/api/Subjects/${subjectToUpdate.id}`, subjectToUpdate);
            setSubjects(subjects.map(sub => (sub.id === subjectToUpdate.id ? subjectToUpdate : sub)));
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

    const saveSubject = () => {
        if (editingSubject) {
            updateSubject(editingSubject);
        } else {
            addSubject(editingSubject);
        }
    };

    const handleUpdateSubject = (updatedSubject) => {
        updateSubject(updatedSubject);
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
                    saveSubject={saveSubject}
                    cancelEdit={cancelEdit}
                />
            ) : (
                <SubjectForm
                    subject={{ name: '', inStock: false }}
                    setSubject={setEditingSubject}
                    saveSubject={saveSubject}
                />
            )}
            <SubjectList subjects={subjects} onDelete={deleteSubject} onEdit={startEditing} onUpdate={handleUpdateSubject} />
        </div>
    );
}

export default App;
