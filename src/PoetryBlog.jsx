import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
// import AddPoem from './AddPoem.jsx';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function PoetryBlog() {
//  const [search, setSearch] = useState('');
  const [poems, setPoems] = useState([]);
  
// Inside your component
const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/poems")
      .then((response) => {
        setPoems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching poems:", error);
      }
    );
  }
  , []);

function handleLogout() {
  localStorage.removeItem("user");
  navigate("/");
}


  
  // const filteredPoems = poems.filter(poem =>
  //   poem.title.toLowerCase().includes(search.toLowerCase()) ||
  //   poem.body.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    
    <div className="p-6 max-w-4xl mx-auto">
      <button
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 float-right"
  onClick={handleLogout}
>
  Logout
</button>
      <h1 className="text-4xl font-bold mb-6 text-center">My Poetry Blog</h1>
        <div className="text-right mb-4">
        <Link to="/add">
  <button>Add Poem</button>
    </Link>
      </div>
      <div className="grid gap-6">
        {poems.map((poem, idx) => (
          <div key={idx} className="shadow-lg p-4 rounded-lg border">
            <img
              src={poem.image}
              alt={poem.title}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <h2 className="text-2xl font-semibold">{poem.title}</h2>
            <p className="whitespace-pre-line text-gray-700">{poem.body}</p>
          </div>
        ))}
      </div>
    </div>
  );

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-4 text-center">My Poetry Blog</h1>
//       <input
//         type="text"
//         placeholder="Search poems..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mb-6 w-full p-2 border border-gray-300 rounded"
//       />
//                         <div className="text-right mb-4">
//   <Link to="/add">
//     <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//       + Add Poem
//     </button>
//   </Link>
// </div>
//       <div className="grid gap-6">
//         {filteredPoems.map((poem, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//           >
//             <div className="overflow-hidden shadow-xl rounded-lg border border-gray-200">
//               <img src={poem.image} alt="poetry" className="w-full h-64 object-cover" />
//               <div className="p-4">
//                 <h2 className="text-2xl font-semibold mb-2">{poem.title}</h2>
//                 <p className="whitespace-pre-line text-gray-700">{poem.body}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//         {filteredPoems.length === 0 && (
//           <p className="text-center text-gray-500">No poems found.</p>
//         )}
//       </div>
//     </div>
//   );
}