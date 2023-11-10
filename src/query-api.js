import axios from 'axios';




// функція-кур`єр яка біжить і робить запит на сервер.
export function fetchInfo (userQuery, pageLoad) { 
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = '40581728-038ade9540e93c29e31f494aa';
    const PARAMS = `&image_type=photo&orientation=horizontal&safesearch=true&page=${pageLoad}&per_page=10`
    const URL = `${BASE_URL}?key=${API_KEY}&q=${userQuery}${PARAMS}`;
    
    console.log(URL)
    
    return fetch(URL).then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.totalHits)
        console.log(data.hits);
    return data})
    .catch(err => console.log(`error: ${err}`));
    }
    
    
    
    // функція-маляр, яка відмальовує розмітку елементу (потім передамо відповідь від бекенду і вона відмалює кожен елемент, який буде у відповіді)
    export  function renderElement ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
        return `
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> <br> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b><br> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> <br> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> <br> ${downloads}
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