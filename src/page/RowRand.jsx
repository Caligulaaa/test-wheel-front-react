import React, { useEffect, useState } from 'react'
import './CSSReact/style.css'
import { useFetching } from './useFetching';

const RowRandom = (props) =>{
    const cells = 91

    const [allItems] = useState(props.myItems)
    
    const [spinResult, setSpinResult] = useState([]);
   
    const [fetchPost,isPostsLoading] = useFetching(() => new Promise((resolve,reject) =>{
        
        const item = allItems[Math.floor(Math.random()*allItems.length)]
        // get item from beckend
        console.log(item)
        setTimeout(() => {
            //тут какаято фигня но только через фаинд оно перерисовыет и выдает то что тянет с бекенда
            // оно имя ток перерисовывает а айди оставляет старый но в бекенд пишет то что и должно а рисует нужное имя
            // плюс первый спин тоже работает с дополнительной проверкой 45 строка
            const found = allItems.find(a => a.name = item.name);
            // console.log(found)
            setSpinResult(found)
           

            start()
            resolve()
          }, 1000)


    }));
        
    function generateItems() {
        document.querySelector('.list').remove()
        document.querySelector('.scope').innerHTML = `
            <ul class="list"></ul>
        `
        const list = document.querySelector('.list')
        for (let i = 0; i < cells; i++) {
            let item = allItems[Math.floor(Math.random()*allItems.length)]
            if (i===45) item = spinResult

            //without undefine after first spin
            if (spinResult.length === 0 && i === 45) item = allItems[0]
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
        if(allItems?.length > 0) {
            generateItems();
        }
    }, [allItems])


    function start() {

        generateItems()

        const list = document.querySelector('.list')
        setTimeout(() => {
            list.style.left = '50%'
            list.style.transform = 'translate3d(-50%, 0, 0)'
        }, 0)
        
        const item = list.querySelectorAll('li')[45]
        list.addEventListener('transitionend', () => {
            item.classList.add('active')
            const data = JSON.parse(item.getAttribute('data-item'))
            // this get item from view
            console.log(data);
        }, {once: true})
    }


    return (
            <div className="myBody">
                <div className="apple">
                    <img className="pointer"  alt="" />
                    <div className="scope">
                        <ul className="list" />
                    </div>
                    {isPostsLoading
                        ?<button onClick={fetchPost} className="start" disabled>Spin</button>
                        :<button onClick={fetchPost} className="start">Spin</button>
                    }
                    
                </div>
            </div>
            
      );
  };

  export default RowRandom;