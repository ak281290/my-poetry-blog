import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddPoem() {
  const [newPoem, setNewPoem] = useState({
    title: '',
    body: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!newPoem.title.trim() || !newPoem.body.trim()) {
      setError('Title and body are required.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('/api/addpoem', newPoem);
      setNewPoem({ title: '', body: '', image: '' });
      navigate('/poems');
    } catch (error) {
      setError("Failed to submit poem. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Poem</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Poem title"
          value={newPoem.title}
          onChange={(e) => setNewPoem({ ...newPoem, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Poem body"
          value={newPoem.body}
          onChange={(e) => setNewPoem({ ...newPoem, body: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded h-32"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={newPoem.image}
          onChange={(e) => setNewPoem({ ...newPoem, image: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Poem"}
        </button>
      </form>
    </div>
  );
}