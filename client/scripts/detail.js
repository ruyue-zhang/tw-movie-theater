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
}

function renderSummary(data) {
  console.log(data.summary);
}

function renderFilmReview(data) {}

function renderRecommend(data) {}


