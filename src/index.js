import Notiflix from 'notiflix';
import { fetchInfo, renderElement } from './query-api'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more')

//слухач ан форму по сабміну
form.addEventListener('submit', async (event) =>{
event.preventDefault();
gallery.innerHTML = '';

let loadCount = 1;

const input = form.elements['searchQuery']; // через властивіть elements дістаємо з форми інпут за назвою
const infoArray = await fetchInfo(input.value, loadCount);

const { hits  , totalHits } = infoArray;

  if (hits.length > 0) { 
const newArr = hits.map((element) => {
   return renderElement(element);
}).join('');

gallery.innerHTML = newArr;
} else {
    console.log("Sorry, there are no images matching your search query. Please try again.")
}

btnLoadMore.addEventListener('click', async ()=>{
if (gallery.children.length >= totalHits) {
    alert('that`s over'); // тренування
    console.log('that`s over')
} else { 
loadCount +=1;
const nextQuery = await fetchInfo(input.value, loadCount);
console.log(loadCount);
const { hits } = nextQuery;
const newArr2 = hits.map((element) => {
    return renderElement(element);
 }).join('');

 gallery.insertAdjacentHTML('beforeend', newArr2)}
})

})




