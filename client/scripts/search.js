let BASIC_URL = 'http://127.0.0.1:8888';
let moviesIdArr =  window.location.search.substring(1).split('=')[1].split('&');
console.log(moviesIdArr);
getSearchResult();
let resultList = '';
function getSearchResult() {
  moviesIdArr.forEach(value => {
    ajax({
      url: BASIC_URL + "/v2/movie/subject/" + value,
      method: "GET",
      success: function(responseText) {
        console.log(responseText);
        renderSearchReaults(responseText);
      }, 
    });
  })
}

function renderSearchReaults(data) {
  document.getElementsByClassName('result-list')[0].innerHTML += `
  <li>
    <div class="movie-infomation">
      <p class="title">${data.title} - ${data.original_title}(${data.pubdates[0].substring(0,4)})</p>
      <div class='poster' style="background-img:url(${data.images.small})"></div>
      <div class="info">
        <p>导演：${data.directors[0].name}</p>
        <p>主演：${data.casts.map(value=>value.name).join('/')}</p>
        <p>类型：${data.genres.join('/')}</p>
        <p>制片国家/地区：${data.countries}</p>
        <p>语言：${data.languages.join('/')}</p>
        <p>片长：${data.durations}</p>
        <p>上映日期：${data.pubdate}</p>
        <p>豆瓣评分：${data.rating.average}</p>
      </div>
    </div>
  </li>`;
}
