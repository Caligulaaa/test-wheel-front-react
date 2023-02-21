import React, { useEffect, useState } from 'react'
import './CSSReact/style.css'
import logo from './IMG/pointer.png'
import { useFetching } from './useFetching';

const RowRandom = () =>{
    const cells = 41

    const [allItems,setallItems] = useState([])
    const [spinResult, setSpinResult] = useState([]);
    //хук который если запрос пришел isPostsLoading True если еще не пришел false
    // для проверки в html
    const [fetchPost,isPostsLoading,posrError] = useFetching(async () => new Promise((resolve, reject) => {
        const getItems = [{id:0,name:'name12345'},{id:1,name:'name1111'},
        {id:2,name:'name2222'},{id:3,name:'name3333'},
        {id:4,name:'name4444'},{id:5,name:'name5555'},
        {id:6,name:'name6666'},{id:7,name:'name7777'},
        {id:8,name:'name8888'},{id:9,name:'name9999'},
        {id:10,name:'name0000'},{id:11,name:'name54321'},];

        setTimeout(() => {
            setallItems(getItems);
            resolve();
        }, 1000)
    }));

    

    // тут получаю с бекенда нужный елемент рандом на беке написан 
    const getItemFromBeckend = () => {
        console.log(allItems)
        // условно выпал 
        const item =  {id:8,name:'name8888'}
        setSpinResult(item)
    }



    function getItem() {
        var item = allItems[Math.floor(Math.random()*allItems.length)]
        return item

        }
        
    function generateItems() {
        document.querySelector('.list').remove()
        document.querySelector('.scope').innerHTML = `
            <ul class="list"></ul>
        `
        const list = document.querySelector('.list')
        for (let i = 0; i < cells; i++) {
            let item = getItem()
            if (i==20) item = spinResult
            const li = document.createElement('li')
            li.setAttribute('data-item', JSON.stringify(item))
            li.classList.add('list__item')
            li.innerHTML = `
            <span><h5>'${item.name}'</h5></span>
            `
            list.append(li)
        }
    }

    useEffect(() => {
        

        // generateItems()
        fetchPost()
        
    }, []);

    useEffect(() => {
        if(allItems?.length > 0) {
            generateItems();
        }
    }, [allItems])

    

    let isStarted = false
    let isFirstStart = true

    //анимация спинера нужно както запустить вместе с кнопкой что делает запрос на 
    //getItemFromBeckend
    function start() {

        if (isStarted) return
        else isStarted = true

        if (!isFirstStart) generateItems()
        else isFirstStart = false

        const list = document.querySelector('.list')
        // list.setAttribute('data-item', JSON.stringify(spinResult))
        setTimeout(() => {
            list.style.left = '50%'
            list.style.transform = 'translate3d(-50%, 0, 0)'
        }, 0)
        
        // console.log(list.querySelectorAll('li')[45].setAttribute('data-item', JSON.stringify(spinResult)))
        const item = list.querySelectorAll('li')[20]
        list.addEventListener('transitionend', () => {
            isStarted = false
            item.classList.add('active')
            const data = JSON.parse(item.getAttribute('data-item'))
            
            console.log(data);
        }, {once: true})
    }


    return (
            <div className="myBody">
                <div className="apple">
                    <img className="pointer" src={logo} alt="" />
                    <div className="scope">
                        <ul className="list" />
                    </div>
                    
                    {isPostsLoading
                    ?<h1>не загрузило еще</h1>
                    :<button onClick={getItemFromBeckend} className="start">Spin</button>
                    }
                    {/* <button onClick={getItemFromBeckend} className="start">Spin</button> */}
                </div>
            </div>
            
      );
  };

  export default RowRandom;