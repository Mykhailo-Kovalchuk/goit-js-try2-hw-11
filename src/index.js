import Notiflix from 'notiflix';
import { fetchInfo, renderElement } from './query-api'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more')

loadMoreHide();
//слухач на форму по сабміну

let loadCount = 1;

form.addEventListener('submit', async (event) =>{
event.preventDefault();
gallery.innerHTML = '';
loadCount = 1;

loadMoreShow ();


const input = form.elements['searchQuery']; // через властивіть elements дістаємо з форми інпут за назвою
const infoArray = await fetchInfo(input.value, loadCount);

const { hits  , totalHits } = infoArray;

  if (hits.length > 0 && input.value !== "") { 
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
const newArr = hits.map((element) => {
   return renderElement(element);
}).join('');

gallery.innerHTML = newArr;

loadCount = 1;
btnLoadMore.addEventListener('click', loadMoreFoo);
} else {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreHide();
    console.log("Sorry, there are no images matching your search query. Please try again.")
}


async function  loadMoreFoo() {
    if (gallery.children.length >= totalHits) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");// тренування
        console.log('that`s over')
    } else { 
        loadCount +=1;
    const nextQuery = await fetchInfo(input.value, loadCount);
    console.log(loadCount);
    const { hits } = nextQuery;
    const loadArray = hits.map((element) => {
        return renderElement(element);
     }).join('');
    
     gallery.insertAdjacentHTML('beforeend', loadArray)}
    };

})









function loadMoreShow (){
    btnLoadMore.style.display = "block";
}
function loadMoreHide (){
    btnLoadMore.style.display = "none";
    
}

