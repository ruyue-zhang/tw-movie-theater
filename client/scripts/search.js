let moviesIdArr =  window.location.search.substring(1).split('=')[1].split('&');
let resultList = '';
getSearchResult();

function getSearchResult() {
  moviesIdArr.forEach(value => {
    ajax({
      url: BASIC_URL + "/v2/movie/subject/" + value,
      method: "GET",
      success: function(responseText) {
        renderSearchReaults(responseText);
      }, 
    });
  })
}

function renderSearchReaults(data) {
  let url = data.images.small;
  document.getElementsByClassName('result-list')[0].innerHTML += `
  <li>
  <a href="detail.html?movieId=${data.id}">
    <div class="movie-infomation">
      <p class="title">${data.title} - ${data.original_title}(${data.pubdates[0].substring(0,4)})</p>
      <div class='poster' style="background-image:url(${url})"></div>
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
    </a>
  </li>`;
}

