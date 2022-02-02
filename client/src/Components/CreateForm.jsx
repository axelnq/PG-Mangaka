import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CreateForm = () => {

  const [input,setInput] = useState({
    title: '',
    synopsis:'',
    images:'',
    authorId:'',
    genere:'',
  })
    return (
      <form>
             <div>
               <h1>Crea tu manga</h1>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={input.title}
                            name="title"
                            // onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Synopsis:</label>
                        <input
                            type="text"
                            value={input.synopsis}
                            name="synposis"
                            // onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input
                            type="text"
                            value={input.image}
                            name="image"
                            // onChange={(e) => handleChange(e)}
                       />
                    </div>
                   
                        <label>Author:</label>
                        <input
                            type="text"
                            value={input.authorId}
                            name="author"
                            // onChange={(e) => handleSelect(e)}
                        />
                          <div/>
            
                    <button className="btnCreate" type="submit">
                        Crear Manga
                    </button>
                    <Link to="/home">
                    <button className="btnCreate">Home</button>
                </Link>
        </form>
    )
}

export default CreateForm