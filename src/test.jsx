import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import poemsData from './data/poems.json';
import axios from 'axios';
export default function AddPoem() {

    const [newPoem, setNewPoem] = useState({
    title: '',
    body: '',
    image: ''
  });


  const [poems, setPoems] = useState(poemsData);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPoem.title || !newPoem.body) return;
    setPoems([{ ...newPoem }, ...poems]);
    setNewPoem({ title: '', body: '', image: '' });
    alert("Poem submitted! (not saved permanently in this demo)");
    navigate('/');
  };

useEffect(() => {
    // Simulate fetching poems from a server
    axios.get('/api/addpoem').then((response) => {
      setPoems(response.data);
    }).catch((error) => {
      console.error("Error fetching poems:", error);
    });
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Poem</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Poem title"
          value={poem.title}
          onChange={(e) => setPoems({ ...poem, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Poem body"
          value={poem.body}
          onChange={(e) => setPoems({ ...poem, body: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded h-32"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={poem.image}
          onChange={(e) => setPoems({ ...poem, image: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Poem
        </button>
      </form>
    </div>
  );
}