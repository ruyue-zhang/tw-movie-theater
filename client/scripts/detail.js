let movieId = window.location.search.substring(1).split('=')[1];
renderPage();

function renderPage() {
  ajax({
    url: BASIC_URL + "/v2/movie/subject/" + movieId,
    method: "GET",
    success: function(responseText) {
      renderMovieInfomation(responseText);
      renderSummary(responseText);
      getReviews(responseText, movieId);
      renderRecommend(responseText);
    },
  })
}

function renderMovieInfomation(data) {
  document.getElementsByClassName('title')[0].innerHTML = `${data.title} - ${data.original_title}(${data.pubdates[0].substring(0,4)})`;
  let poster = document.getElementsByClassName('poster')[0];
  let url = data.images.small;
  poster.style.backgroundImage = `url("${url}")`;
  let info = document.getElementsByClassName("info")[0];
  info.innerHTML = `
  <p>导演：${data.directors[0].name}</p>
  <p>主演：${data.casts.map(value => value.name).join("/")}</p>
  <p>类型：${data.genres.join("/")}</p>
  <p>制片国家/地区：${data.countries}</p>
  <p>语言：${data.languages.join("/")}</p>
  <p>片长：${data.durations}</p>
  <p>上映日期：${data.pubdate}</p>
  <p>豆瓣评分：${data.rating.average}</p>
  `;
}

function renderSummary(data) {
  document.getElementsByClassName("summary")[0].innerHTML += `<p>${data.summary}</p>`;
}

function getReviews(data, movieId) {
  ajax({
    url:
      BASIC_URL + "/v2/movie/subject/" + movieId + "/reviews?start=0&count=5",
    method: "GET",
    success: function(responseText) {
      renderFilmReview(responseText);
    }, 
  })
}

function renderFilmReview(data) {
  let content = "";
  let value = data.reviews;
  for (let i = 0; i < 5; i++) {
    content += `
    <li>
      <img src="${value[i].author.avatar}" alt="#">
      <span>${value[i].title}</span>
      <p class='review-content' onclick="changeStyle(event)">${value[i].content}</p>
    </li>`;
  }
  document.getElementsByClassName("movie-comments")[0].innerHTML += content;
}

function renderRecommend(data) {
  let movieType = data.genres;
  alldata = JSON.parse(localStorage.getItem("moviedata"));
  let RecommendMovieArr = [];
  movieType.forEach((type) => {
    alldata.forEach(item => {
      if (item.genres.indexOf(type) > -1 && item.id !== data.id) {
        RecommendMovieArr.push(item);
      }
    });
  });
  RecommendMovieArr = RecommendMovieArr.splice(0,5);
  showRecommendMovies(RecommendMovieArr);
}

function showRecommendMovies(data) {
  let recommendList = document.getElementsByClassName("recommend-movies")[0];

  for (let index = 0; index < data.length; ++index) {
    let recommendMovieDiv = document.createElement("div");
    let recommendMovieCoverLink = document.createElement("a");
    let recommendMovieCover = document.createElement("img");
    let recommendMovieNameAndYear = document.createElement("a");
    let recommendMovieGen = document.createElement("p");
    let recommendMovieRate = document.createElement("p");

    recommendMovieDiv.setAttribute("class","recommend-item");
    recommendMovieCover.setAttribute("src", `${data[index].images.small}`);
    recommendMovieCover.setAttribute("class", "recommend-covers");
    recommendMovieNameAndYear.setAttribute("href",`detail.html?keywords=${data[index].id}`)
    recommendMovieCoverLink.setAttribute(
      "href",
      `detail.html?keywords=${data[index].id}`
    );
    recommendMovieNameAndYear.innerHTML = `${data[index].title}/${data[index].year}`;
    recommendMovieGen.innerHTML = `分类：${data[index].genres.join("/")}`;
    recommendMovieRate.innerHTML = `评分：${data[index].rating.average}/10`;

    recommendMovieCoverLink.appendChild(recommendMovieCover);
    recommendMovieDiv.appendChild(recommendMovieCoverLink);
    recommendMovieDiv.appendChild(recommendMovieNameAndYear);
    recommendMovieDiv.appendChild(recommendMovieGen);
    recommendMovieDiv.appendChild(recommendMovieRate);
    recommendList.appendChild(recommendMovieDiv);
  }
}

function changeStyle(event) {
  event.target.classList.toggle("review-content-1");
}
