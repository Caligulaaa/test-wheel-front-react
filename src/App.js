import { useEffect, useState } from 'react';
// import './App.css';

import RowRandom from './page/RowRand';
import { useFetching } from './page/useFetching';

function App() {
  const [allItems,setallItems] = useState([])
  const [fetchPost,isPostsLoading] = useFetching(() => new Promise((resolve,reject) => {
    //get request all items for speen 
    const getItems = [{id:0,name:'name12345'},{id:1,name:'name1111'},
                    {id:2,name:'name2222'},{id:3,name:'name3333'},
                    {id:4,name:'name4444'},{id:5,name:'name5555'},
                    {id:6,name:'name6666'},{id:7,name:'name7777'},
                    {id:8,name:'name8888'},{id:9,name:'name9999'},
                    {id:10,name:'name0000'},{id:11,name:'name54321'},]
    setTimeout(() => {
      setallItems(getItems)
      resolve()
    }, 0)

    // setallItems(getItems)
    // setallItems(getItems)
    //вот єту херню хз как закинуть что снизу если еще setTimeout будет как будто с запроса
    
}));

useEffect(() => {
  fetchPost()
}, [])


  return (
    <div className="App">
      {isPostsLoading
      ?<h1>loading...</h1>
      :<RowRandom myItems ={allItems}/>
      }
      
    </div>
  );
}

export default App;
