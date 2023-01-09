import AddItem from './AddItem';
import './App.css';
import { useState, useEffect } from 'react'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {
const API_URL = 'http://localhost:3500/items'

const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
const [newItem,setNewItem]= useState('')
const [search, setSearch]= useState('')
const [fetchError, setFetchError] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
  const fetchItems = async () =>{
    try {
      const response = await fetch(API_URL);
      if(!response.ok) throw Error('Did not received expected data');
      const listItems = await response.json();
      setItems(listItems);
      setFetchError(null)
      
    } catch (error) {
      setFetchError(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  setTimeout(()=>{
    (async()=>await fetchItems())();
  },2000)

},[])

const addItem = async(item) =>{
  const id = items.length ? items[items.length-1].id +1 : 1;
  const myNewItem = {id,checked:false, item};
  const listItems = [...items,myNewItem]
  setItems(listItems)

  const postOptions = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL, postOptions);
  if (result) setFetchError(result)
}

const handleCheck = async(id) =>{
  const listItems = items.map((item)=> item.id ===id ? {...item, checked: !item.checked}: item);
  setItems(listItems)

  const myItem = listItems.filter((item) => item.id===id)
  const updateOptions ={
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({checked:myItem[0].checked})
  }
  const url = `${API_URL}/${id}`
  const result = await apiRequest(url,updateOptions)
  if(result) setFetchError(result)
}

const handleDelete = async (id)=>{
  const listItems = items.filter((item)=> item.id !== id);
  setItems(listItems)

  const deleteOptions = {
    method:'DELETE'
  }
  const url = `${API_URL}/${id}`
  const result = await apiRequest(url,deleteOptions)
  if(result) setFetchError(result)
}

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!newItem) return;
  addItem(newItem)
  setNewItem('')
}
  return (
    <div className="App">
      <Header title="welcome to my page"/>
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem
      search={search}
      setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading</p>}
      {fetchError && <p>{fetchError}</p>}
      {!fetchError && !isLoading && 
      <Content 
      items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
    }
      </main>
      <Footer length={items.length}
      />
    </div>
  );
}

export default App;
