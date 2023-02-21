

const cells = 51

const items = [
  {name: 'iPhone', img: 'Text1', chance: 10},
  {name: 'Keyboard', img: 'Text2', chance: 25},
  {name: 'Headphones', img: 'Text3', chance: 40},
  {name: 'banda', img: 'Text4', chance: 53},
  {name: 'monk', img: 'Text5', chance: 31}
]


let backendelem;

// тут я как бы сюда добавляю то что пришло с бєка ну и достаю шаблоный елемент
// чисто для шаблона в реакте сразу достаю нужный елемент принципе стандарт
// и пишу его в backendelem
//в реакте нету поиска forEach как тут там сразу нужный находит)
let itemfrombk = 'banda'

items.forEach(elem => {
  
  if(itemfrombk === elem.name) backendelem = elem 

})

// функция для крутинки подставляет рандомый елемент 
// но еще она както используется для прорисовки самого спинера еще до крутки

function getItem() {

  var item = items[Math.floor(Math.random()*items.length)]
  return item
}


// сдесь както чото фиг знает чо))
// используется для прорисовки при запуске страницы типа useEffect
// до клика выходит оно рисует еще до того как я кликнул 
// 
function generateItems() {
  document.querySelector('.list').remove()
  document.querySelector('.scope').innerHTML = `
    <ul class="list"></ul>
  `
  
  const list = document.querySelector('.list')

  for (let i = 0; i < cells; i++) {
    let item = getItem()
    // тут я записал что именно 25 елемент будет мой тот что я условно получил с бека
    // если сюда передать запрос с бека то оно отрисует 25 елемент как андефайнд типа прорисовка прошла
    // а елемент еще неуспел дойти
    if (i==25) item = backendelem
    const li = document.createElement('li')
    li.setAttribute('data-item', JSON.stringify(item))
    li.classList.add('list__item')
    li.innerHTML = `
    <span class="font span5"><h5>'${item.img}'</h5></span>
    `
    list.append(li)
  }
}
//рисует
generateItems()

let isStarted = false
let isFirstStart = true
//сдесь анимация как я понял
function start() {
  if (isStarted) return
  else isStarted = true

  if (!isFirstStart) generateItems()
  else isFirstStart = false
  const list = document.querySelector('.list')

  setTimeout(() => {
    list.style.left = '50%'
    list.style.transform = 'translate3d(-50%, 0, 0)'
  }, 0)
  //тут я задаю 25 елемент мой, хз чо так
  //в самом верху есть cells  вроди как если там 51 стоит то нужно тут ставить 25
  // если условно 81 то 40 тут короче както на половину делитьно с половинкой аххаха
  // не принцыпиально))
  // крутит как нада вообщем
  const item = list.querySelectorAll('li')[25]
  list.addEventListener('transitionend', () => {
    isStarted = false
    item.classList.add('active')
    const data = JSON.parse(item.getAttribute('data-item'))
    
    console.log(data);
  }, {once: true})
}

// но я немогу как передать мой нужный с бека елемент сюда чтоб и прорисовка была и чтоб крутило
// пока не пройдет запрос
