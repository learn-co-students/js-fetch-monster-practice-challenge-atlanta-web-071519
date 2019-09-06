let pageNum = 1; 

const renderMonster = (monsterObj) => {
    const newMonster = new Monster(monsterObj)
    newMonster.render();
}

const renderMonsters = (monstersArray) => {
    monstersArray.forEach((monsterObj) => {
        renderMonster(monsterObj); 
    })
}

const fetchMonsters = (pageNum) => {
    fetch('http://localhost:3000/monsters?_limit=50&_page=' + pageNum)
        .then(resp => resp.json())
        .then(data => {
            renderMonsters(data); 
        })
}

const scrapeFormData = (e) => {
    const name = e.target[0].value;
    const age = e.target[1].value;
    const description = e.target[2].value; 
    return {name, age, description};
}

const clearInputFields = () => {
    const fieldOne = document.getElementById('monster-name');
    const fieldTwo = document.getElementById('monster-age');
    const fieldThree = document.getElementById('monster-description');
    fieldOne.value = '';
    fieldTwo.value = '';
    fieldThree.value = ''; 

}

const handleSubmit = (e) => {
    e.preventDefault(); 
    const newMonster = scrapeFormData(e); 
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMonster)
    } 

    fetch('http://localhost:3000/monsters', reqObj)
        .then(resp => resp.json())
        .then(data => {
            renderMonster(data); 
            clearInputFields(); 
        })
}

const addFormListener = () => {
    const monsterForm = document.querySelector('#new-monster-form');
    monsterForm.addEventListener('submit', (e) => {
        handleSubmit(e); 
    })
}

const addNext50Listener = () => {
    const next50Btn = document.querySelector('#show-next-50');
    next50Btn.addEventListener('click', () => {  
        pageNum++
        pageNum = pageNum.toString(); 
        fetchMonsters(pageNum); 
    })
}

const main = () => {
    
    document.addEventListener("DOMContentLoaded", () => {
        fetchMonsters(pageNum); 
        addFormListener(); 
        addNext50Listener(); 
    })
}

main();

class Monster {
    constructor(monsterObj){
        this.id = monsterObj.id; 
        this.name = monsterObj.name;
        this.age = monsterObj.age;
        this.description = monsterObj.description; 
    }

    render(){
        const monsterContainer = document.querySelector('#monster-container');
        const monsterCard = document.createElement('div');
        monsterCard.dataset.id = this.id;  
        const monsterName = document.createElement('h3');
        monsterName.innerText = this.name; 
        const monsterAge = document.createElement('p');
        monsterAge.innerText = this.age; 
        const monsterDesc = document.createElement('p');
        monsterDesc.innerText = this.description; 
        monsterCard.append(monsterName);
        monsterCard.append(monsterAge);
        monsterCard.append(monsterDesc);
        monsterContainer.append(monsterCard); 
    }
}
