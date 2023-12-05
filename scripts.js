const shapes = [
    {imgSrc:'azurecircle',  englishName:'azure circle', russianName:'голубой круг'},
    {imgSrc:'azuresquare',  englishName:'azure square', russianName:'голубой квадрат'},
    {imgSrc:'azurestar',  englishName:'azure star', russianName:'голубая звезда'},
    {imgSrc:'azuretriangle',  englishName:'azure triangle', russianName:'голубой треугольник'},

    {imgSrc:'blackcircle',  englishName:'black circle', russianName:'чёрный круг'},
    {imgSrc:'blacksquare',  englishName:'black square', russianName:'чёрный квадрат'},
    {imgSrc:'blackstar',  englishName:'black star', russianName:'чёрная звезда'},
    {imgSrc:'blacktriangle',  englishName:'black triangle', russianName:'чёрный треугольник'},

    {imgSrc:'bluecircle',  englishName:'blue circle', russianName:'синий круг'},
    {imgSrc:'bluesquare',  englishName:'blue square', russianName:'синий квадрат'},
    {imgSrc:'bluestar',  englishName:'blue star', russianName:'синяя звезда'},
    {imgSrc:'bluetriangle',  englishName:'blue triangle', russianName:'синий треугольник'},

    {imgSrc:'browncircle',  englishName:'brown circle', russianName:'коричневый круг'},
    {imgSrc:'brownsquare',  englishName:'brown square', russianName:'коричневый квадрат'},
    {imgSrc:'brownstar',  englishName:'brown star', russianName:'коричневая звезда'},
    {imgSrc:'browntriangle',  englishName:'brown triangle', russianName:'коричневый треугольник'},
    
    {imgSrc:'graycircle',  englishName:'gray circle', russianName:'серый круг'},
    {imgSrc:'graysquare',  englishName:'gray square', russianName:'серый квадрат'},
    {imgSrc:'graystar',  englishName:'gray star', russianName:'серая звезда'},
    {imgSrc:'graytriangle',  englishName:'gray triangle', russianName:'серый треугольник'},

    {imgSrc:'greencircle',  englishName:'green circle', russianName:'зелёный круг'},
    {imgSrc:'greensquare',  englishName:'green square', russianName:'зелёный квадрат'},
    {imgSrc:'greenstar',  englishName:'green star', russianName:'зелёная звезда'},
    {imgSrc:'greentriangle',  englishName:'green triangle', russianName:'зелёный треугольник'},

    {imgSrc:'orangecircle',  englishName:'orange circle', russianName:'оранжевый круг'},
    {imgSrc:'orangesquare',  englishName:'orange square', russianName:'оранжевый квадрат'},
    {imgSrc:'orangestar',  englishName:'orange star', russianName:'оранжевая звезда'},
    {imgSrc:'orangetriangle',  englishName:'orange triangle', russianName:'оранжевый треугольник'},

    {imgSrc:'pinkcircle',  englishName:'pink circle', russianName:'розовый круг'},
    {imgSrc:'pinksquare',  englishName:'pink square', russianName:'розовый квадрат'},
    {imgSrc:'pinkstar',  englishName:'pink star', russianName:'розовая звезда'},
    {imgSrc:'pinktriangle',  englishName:'pink triangle', russianName:'розовый треугольник'},

    {imgSrc:'purplecircle',  englishName:'purple circle', russianName:'фиолетовый круг'},
    {imgSrc:'purplesquare',  englishName:'purple square', russianName:'фиолетовый квадрат'},
    {imgSrc:'purplestar',  englishName:'purple star', russianName:'фиолетовая звезда'},
    {imgSrc:'purpletriangle',  englishName:'purple triangle', russianName:'фиолетовый треугольник'},

    {imgSrc:'redcircle',  englishName:'red circle', russianName:'красный круг'},
    {imgSrc:'redsquare',  englishName:'red square', russianName:'красный квадрат'},
    {imgSrc:'redstar',  englishName:'red star', russianName:'красная звезда'},
    {imgSrc:'redtriangle',  englishName:'red triangle', russianName:'красный треугольник'},
 
    {imgSrc:'whitecircle',  englishName:'white circle', russianName:'белый круг'},
    {imgSrc:'whitesquare',  englishName:'white square', russianName:'белый квадрат'},
    {imgSrc:'whitestar',  englishName:'white star', russianName:'белая звезда'},
    {imgSrc:'whitetriangle',  englishName:'white triangle', russianName:'белый треугольник'},
    
    {imgSrc:'yellowcircle',  englishName:'yellow circle', russianName:'жёлтый круг'},
    {imgSrc:'yellowsquare',  englishName:'yellow square', russianName:'жёлтый квадрат'},
    {imgSrc:'yellowstar',  englishName:'yellow star', russianName:'жёлтая звезда'},
    {imgSrc:'yellowtriangle',  englishName:'yellow triangle', russianName:'жёлтый треугольник'}
];
const gallery = document.querySelector('.gallery');
const instruction = document.querySelector('#instruction');
const restartButton = document.querySelector('#restartButton');
const languageButton = document.querySelector('#language');;
let record = {};
let recordRemovedShapes = {};
let count = 0;
let currentShapePosition = null;
let language = JSON.parse(localStorage.getItem('language-pick-a-category'));
if (language == null) language = 'english';


const generateGrid = () => {
    while (count < shapes.length) {
        let pos = Math.floor(Math.random() * shapes.length);

        while (record.hasOwnProperty(pos) == true) {
            pos = Math.floor(Math.random() * shapes.length);
        }
        record[pos] = true;
       
       gallery.innerHTML += `<div class='shapeDiv'>
            <img class='shapeImage' id=${shapes[pos]['imgSrc']} src=./images/${shapes[pos]['imgSrc']}.png />
        </div>`;

        count++;
    }
    
    currentShapePosition  = Math.floor(Math.random() * shapes.length);
    instruction.innerHTML = `Find and click on <span class='shapeName'>${shapes[currentShapePosition]['englishName']}</span>`;
    loadLanguage();
}

const removeShape = (event) => {
    if (event.target.id == shapes[currentShapePosition]['imgSrc']) {
        gallery.removeChild(event.target.parentNode);
        recordRemovedShapes[shapes[currentShapePosition]['imgSrc']] = 1;
        count--;
        
        if (count == 0) {
            instruction.innerHTML = `<span class='shapeName'>Good work!</span>`;
            restartButton.style.display = 'block';
        } else {
            // Pick a new shape
            currentShapePosition  = Math.floor(Math.random() * shapes.length);

            while (recordRemovedShapes.hasOwnProperty(shapes[currentShapePosition]['imgSrc']) == true) {
                currentShapePosition = Math.floor(Math.random() * shapes.length);
            }
            instruction.innerHTML = `Find and click on <span class='shapeName'>${shapes[currentShapePosition]['englishName']}</span>`;
        }
    }
}

const restartGame = () => {
    record = {};
    recordRemovedShapes = {};
    currentShapePosition = null;

    generateGrid();
    restartButton.style.display = 'none';
}

const toggleL = () => {
    if (language == 'english') {
        language = 'russian';
        languageButton.textContent = 'ENG';
        instruction.innerHTML = `Найди и кликни на <span class='shapeName'>${shapes[currentShapePosition]['russianName']}</span>`;
    } else {
        language = 'english';
        languageButton.textContent = 'RUS';
        instruction.innerHTML = `Find and click on <span class='shapeName'>${shapes[currentShapePosition]['englishName']}</span>`;
    }
    localStorage.setItem(`language-pick-a-category`, JSON.stringify(language));
}

const loadLanguage = () => {
    if (language == 'english') {
        languageButton.textContent = 'RUS';
        instruction.innerHTML = `Find and click on <span class='shapeName'>${shapes[currentShapePosition]['englishName']}</span>`;
    } else {
        languageButton.textContent = 'ENG';
        instruction.innerHTML = `Найди и кликни на <span class='shapeName'>${shapes[currentShapePosition]['russianName']}</span>`;
    }
}

window.addEventListener('DOMContentLoaded', generateGrid);
gallery.addEventListener('click', removeShape);
restartButton.addEventListener('click', restartGame);
languageButton.addEventListener('click', toggleL);