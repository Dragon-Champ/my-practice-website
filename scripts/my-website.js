const allListItems = document.querySelectorAll('nav li')
const menuButton = document.querySelector('#menu')
const navMenu = document.querySelector('.nav-menu')
const background = document.querySelector('.background')
let liPositions = [ { x: 0 , y: 0}] 

function randomNumber(max,min){
  let randomNumber = Math.floor(Math.random()*(max - min + 1)) + min
   
  return randomNumber 
}

menuButton.addEventListener('click', () => {
  if (!menuButton.classList.contains('active')) {
    for (const listItem of allListItems) {
      let translation = 0
      let rotation = 0
      
      let foundPosition = false
      while (!foundPosition) {
        translation = randomNumber(80,301)
        rotation = randomNumber(0,361)
        let rotationRadians = rotation * Math.PI / 180
        
        xPos = translation * Math.cos(Math.PI - rotationRadians)
        yPos = translation * Math.sin(Math.PI - rotationRadians)
        
        let tooClose = false
        liPositions.forEach((position) => {
          let distance = Math.sqrt((position.x - xPos)**2 + (position.y - yPos)**2)
          if (distance <= 80) {
            tooClose = true
            console.log('too close')
          }
          
        });
        if (tooClose) {
          continue
        } else {
          foundPosition = true
        }
      }
      liPositions.push({x: xPos , y:yPos})

      listItem.style = ` translate:${-translation}px;
      transform-origin: ${translation+37}px ; rotate: ${rotation}deg ;`
      
      const liDiv = listItem.querySelector('div')
      liDiv.style = `rotate:-${rotation}deg`
      navMenu.classList.add('active')
      menuButton.classList.add('active')
      background.style = 'opacity: 0.7;'
    }
  } else {
    for (const listItem of allListItems) {
      const liDiv = listItem.querySelector('div')
      listItem.style = `rotate: 0deg ; translate: 0px;
        transform-origin: 37px`

      liDiv.style = `rotate: 0deg ; transition: rotate 0s 1.1s`
      
    }
    navMenu.classList.remove('active')
    menuButton.classList.remove('active')
    background.style = 'opacity: 1;'
    liPositions = [ { x: 20 , y: 30}]
  }
})