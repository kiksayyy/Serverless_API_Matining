import Resct, {useEfffect, useState} from 'react';
import axios from 'axios';

function DataForm() {
const [data,setData] = useState([]);
const [name, setName] = useState('');
const [age,setAge] = useState ('');
const [errror, setError] = useState(null);
const [editItem, setEditItem] = useState(null);

useEffect(() => {
    // GET request to fetch initial data
    axios
        .get('https://genuine-bublanina-7bb45c.netlify.app/.netlify/functions/api/')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
}, []);

const handleSubmit = (e, id = null) => {
    e.preventDefault();

    if (!name || !age) {
        setError('Name and age are required');
        return;
    }

    const url = id
    ? 'https://genuine-bublanina-7bb45c.netlify.app/.netlify/functions/api/${id}'
    : 'https://genuine-bublanina-7bb45c.netlify.app/.netlify/functions/api/';
    const method =  id ? 'put' : 'post' ;

    //POST or PUT request
    axios[method](url, {name, age})
        .then((response) => {
            if (id) {
                setData(data.map((item) => (item.id === id ? response.data : item)));
            } else {
                setData([...data, response.data]);
            }
            setName('');
            setAge('');
            setError(null);
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
};

const handleEdit = (_id) => {
    const itemToEdit = data.find((item) => item._id === _id);
    setEditItem(itemToEdit);
    setName(itemToEdit.name);
    setAge(itemToEdit.age);
};

const handleDete = (id) => {
    //DELETE request
    axios
    .delete (
        'https://genuine-bublanina-7bb45c.netlify.app/.netlify/functions/api/${id}'
    )
    .then(() => {
        console.error('There was an error!',error);
    });
};

return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                type ='text'
                value = {name}
                onChange = {(e) = setName(e.target.value)}
                placeholder = 'Name'
            />
            <input
                type ='text'
                value = {name}
                onChange = {(e) = setName(e.target.value)}
                placeholder = 'Name'
            />
            <button type='submit'>Add Data</button>
            </form>

            {error && <p>{error}</p>}
            <button onClick={() => handleSubmit(null, 1)} >Update Data </button>

            {
                <ul>
                    {data.map((item) => (
                    <li key = {item._id}>
                        {item.name} - {item.age}
                        <button onClick={() => handleEdit(item._id)}>Exit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
                </ul>
            }
            </div>
);
}

export default DataForm;
