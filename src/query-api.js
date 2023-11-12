import axios from 'axios';
import Notiflix from 'notiflix';
// const API_KEY = '40581728-038ade9540e93c29e31f494aa';
// axios.defaults.headers.common['x-api-key'] = API_KEY;


// функція-кур`єр яка біжить і робить запит на сервер.
export function fetchInfo (userQuery, pageLoad) { 
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = '40581728-038ade9540e93c29e31f494aa';
    const PARAMS = `&image_type=photo&orientation=horizontal&safesearch=true&page=${pageLoad}&per_page=40`
    const URL = `${BASE_URL}?key=${API_KEY}&q=${userQuery}${PARAMS}`;
    
    // console.log(URL)
  
    return axios.get(URL)                        // fetch(URL).then(res => res.json())
    .then(resp => {
        console.log(resp.data);
        console.log(resp.data.totalHits)
        console.log(resp.data.hits);
    return resp.data})
    .catch(err => {
    Notiflix.Notify.failure("От халепа! Щось пішло не так!");// тренування

      console.log(`error: ${err}`)});
    }
    
    
    
    // функція-маляр, яка відмальовує розмітку елементу (потім передамо відповідь від бекенду і вона відмалює кожен елемент, який буде у відповіді)
    export  function renderElement ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
        return `
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="image"/>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> 
               ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
               ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> 
               ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> 
               ${downloads}
          </p>
        </div>
      </div>
        `
    }
    
    // var API_KEY = 'YOUR_API_KEY';
    // var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
    // $.getJSON(URL, function(data){
    // if (parseInt(data.totalHits) > 0)
    //     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
    // else
    //     console.log('No hits');
    // });