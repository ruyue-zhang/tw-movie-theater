renderPage();

function renderPage() {
  // let keyWords =  window.location.search.substring(1);
  ajax({
    url: BASIC_URL + "/v2/movie/subject/" + "1308779",
    method: "GET",
    success: function(responseText) {
      console.log(responseText);
      renderMovieInfomation(responseText);
      renderSummary(responseText);
      renderFilmReview(responseText);
      renderRecommend(responseText)
    }, 
  });
}

function renderMovieInfomation(data) {
  document.getElementsByClassName('title')[0].innerHTML = `${data.title} - ${data.original_title}(${data.pubdate})`;
  let poster = document.getElementsByClassName('poster')[0];
  let url = data.images.small;
  poster.style.backgroundImage = `url("${url}")`;
  let info = document.getElementsByClassName('info')[0];
  info.innerHTML = `
  <p>导演：${data.directors[0].name}</p>
  <p>主演：${data.casts.map(value=>value.name).join('/')}</p>
  <p>类型：${data.genres.join('/')}</p>
  <p>制片国家/地区：${data.countries}</p>
  <p>语言：${data.languages.join('/')}</p>
  <p>片长：${data.durations}</p>
  <p>上映日期：${data.pubdate}</p>
  <p>豆瓣评分：${data.rating.average}</p>
  `;
}

function renderSummary(data) {
  document.getElementsByClassName('summary')[0].innerHTML += `<p>${data.summary}</p>`;
  console.log(data.summary);
}

function renderFilmReview(data) {}

function renderRecommend(data) {}


