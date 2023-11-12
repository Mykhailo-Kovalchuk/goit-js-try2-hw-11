import Notiflix from 'notiflix';
import { fetchInfo, renderElement } from './query-api'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more')

loadMoreHide(); // приховую кнопку за замовчуванням


let loadCount = 1; // ствоюю змінну на початку, яка буде слугувати моїм параметром page для запиту на серевер (буде оновлюватись при натисканні кнопки load more)
const input = form.elements['searchQuery']; // через властивіть elements дістаємо з форми інпут за назвою (потім з нього треба буде значення брати)

//слухач на форму по сабміну
form.addEventListener('submit', async (event) =>{ 
event.preventDefault(); // традиційно перериваємо перезавантаження при натисканні
gallery.innerHTML = ''; // і про всяк випадрк оновлюю до нуля розмітку в галереї  
loadCount = 1;

const backendInfoArray = await fetchInfo(input.value, loadCount); // роблю запит на сервер і результат записую в масив

if (backendInfoArray.hits.length > 0 && input.value !== "") {  // умова перевіркиЮ якщо повернений результат більше нуля і поле імпуту не пусте тоді:
    Notiflix.Notify.success(`Hooray! We found ${backendInfoArray.totalHits} images.`); // виводжу повідомлення про кількість отриманих результатів
    const arrayMarkup = resultQuery(backendInfoArray); // далі створюю змінну якій присвоюю результат виклику функції, в яку передав нашу відповідь від серверу, щоб вона її відмалювала.
    gallery.innerHTML = arrayMarkup; // далі вже відмальовуємо розміку в галереї передавши їй наш масив розміток.
    loadMoreShow (); // після чого показую кнопку

} else { // якщо умова хибна, тоді кнопка прихована й надалі і є повідомлення про невдалий запит.
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreHide();}
})


// вішаю слухача на кнопку завантаження додаткових картинок
btnLoadMore.addEventListener('click', async () => { 

    loadCount +=1; // при натисканні на кнопку, додаємо і оновлюємл нашу змінну яка передає своє значення параметру page для пагінації
const backendResp2 = await fetchInfo(input.value, loadCount); //роблю наступний запит на сервер і результат записую в масив (як попереднього разу)
// console.log(loadCount);
// console.log(gallery.children.length);

if (!backendResp2 || gallery.children.length >= backendResp2.totalHits) { // умова, якщо кількість елеметів в нашій галереї більша або рівна нашій загальній кількості відповідей (картинок) з серверу, тоді:
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");// показую повідомлення, що більше результатів немає
    // console.log('that`s over') 
    loadMoreHide(); // І приховую кнопку.
} else {

const loadArrayMarkup = resultQuery(backendResp2); // І знвоу створюю змінну якій присвоюю результат виклику функції, в яку передав нашу відповідь від серверу, щоб вона її відмалювала.
gallery.insertAdjacentHTML('beforeend', loadArrayMarkup)} // Після чого відмальовуємо розміку в галереї передавши їй наш масив розміток, але через insertAdjacentHTML, щоб розмітка яка вже там є не зникла.
});


function resultQuery (arrayResp) { // функція-помічник для повернення та опрацювання результату запиту

    const { hits  , totalHits } = arrayResp; // Одразу роблю деструктуризацію і витягу необхіні мені дані, а саме масив об`єктів який приходить у властивості hits

const newArr = hits.map((element) => { // Проганяємо масив об. hits через map де на кожен елемент викликаємо функцію яка відмалює результат в html.
   return renderElement(element);
}).join(''); // ще треба заджойнити наш новий масив. 
return newArr; // повертаю отриманий результат - новий масив
}


function loadMoreShow (){ // функція-помічник для показу кнопки
    btnLoadMore.style.display = "block";
}
function loadMoreHide (){ // функція-помічник для приховування кнопки
    btnLoadMore.style.display = "none";
    
}





// ------------- Код до оптимізації---------------------------------------------

// import Notiflix from 'notiflix';
// import { fetchInfo, renderElement } from './query-api'

// const form = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const btnLoadMore = document.querySelector('.load-more')

// loadMoreHide();
// //слухач на форму по сабміну

// let loadCount = 1;

// form.addEventListener('submit', async (event) =>{
// event.preventDefault();
// gallery.innerHTML = '';
// loadCount = 1;

// const input = form.elements['searchQuery']; // через властивіть elements дістаємо з форми інпут за назвою
// const usersQuery = input.value;
// const infoArray = await fetchInfo(usersQuery, loadCount);

// const { hits  , totalHits } = infoArray;

//   if (hits.length > 0 && input.value !== "") { 
//     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
// const newArr = hits.map((element) => {
//    return renderElement(element);
// }).join('');

// gallery.innerHTML = newArr;
// loadMoreShow ();

// btnLoadMore.addEventListener('click', loadMoreFoo);
// } else {
//     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     loadMoreHide();
//     console.log("Sorry, there are no images matching your search query. Please try again.")
// }


// function resultSearcher (arrayResp, queryText) {

// }



// async function  loadMoreFoo() {
//     if (gallery.children.length >= totalHits) {
//         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");// тренування
//         console.log('that`s over')
//     } else { 
//         loadCount +=1;
//     const nextQuery = await fetchInfo(input.value, loadCount);
//     console.log(loadCount);
//     const { hits } = nextQuery;
//     const loadArray = hits.map((element) => {
//         return renderElement(element);
//      }).join('');
    
//      gallery.insertAdjacentHTML('beforeend', loadArray)}
//     };

// })




// function loadMoreShow (){
//     btnLoadMore.style.display = "block";
// }
// function loadMoreHide (){
//     btnLoadMore.style.display = "none";
    
// }

