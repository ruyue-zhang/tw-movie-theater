let BASIC_URL = 'http://127.0.0.1:8888';
var movieId = '26942674';
const top250 = 'top250';
var movieDatas = [];
//  searchByKeyWords();

function getAllData() {
  ajax({
      url: BASIC_URL + '/v2/movie/' + top250,
      method: "GET", 
      success: function(responseText) {
         mainPage(responseText);
      }, 
  })
}

function mainPage(data) {
  getGenres(data.subjects);
  addMoviesInfo(data.subjects);
}

function getGenres(data) {
  movieDatas = data;
  var tempArr = [];
  var genArr = [];
  for(index = 0; index < data.length; ++index) {
    tempArr.push(data[index].genres);
  }
  tempArr.forEach((tItem) => {
    tItem.forEach((innerItem) => {
      genArr.push(innerItem);
    });
  })
  sortGenres(genArr);
}

function sortGenres(data) {
  let tempArr = data.sort();
  let resArr = [];
  for (let index = 0; index < data.length; ++index) {
    if(tempArr[index] === tempArr[index+1]) {
      continue;
    } else {
      resArr.push(tempArr[index]);
    }
  }
  addResList(resArr);
}

function addResList(res) {
  let typeList = document.getElementsByClassName("type-list")[0];
  let allItem = document.createElement("li");
  allItem.setAttribute("class","movie-type");
  allItem.setAttribute("id","全部");
  allItem.innerHTML = '全部';
  typeList.appendChild(allItem);
  for (let index = 0; index < res.length; ++index) {
    let resItem = document.createElement("li");
    resItem.setAttribute("class","movie-type");
    resItem.setAttribute("id",`${res[index]}`);
    let resname = `${res[index]}`;
    resItem.innerHTML = resname;
    typeList.appendChild(resItem);
  }
  typeList.addEventListener("click",function(event) {
    filterMovies(event.target.id);
  })
}

function filterMovies(resId) {
  let filterArr = [];
  movieDatas.forEach((item) => {
    if(item.genres.indexOf(resId) > -1) {
      filterArr.push(item);
    }
  })
  if(resId === '全部') {
    filterArr = movieDatas;
  }
  changeChecked(resId);
  addMoviesInfo(filterArr);
}

function changeChecked(resId) {
  let typeList = document.getElementsByClassName("movie-type");
  let checkedGen = document.getElementById(resId);
  for (let index = 0; index < typeList.length; ++index) {
    typeList[index].style.color = 'black';
  }
  checkedGen.style.color = 'rgb(253, 112, 18)';
}

var movieList = document.getElementsByClassName("movie-list")[0];

function addMoviesInfo(data) {
  movieList.innerHTML = '';
    for(let rowCount = 0; rowCount < (data.length / 3); ++rowCount) {
      let movieRow = document.createElement("tr");
      movieRow.setAttribute("class","movie-row");
      for(let colCount = 0; colCount < 3; ++colCount) {
        if(rowCount * 3 + colCount === 100 || data.length <= colCount + rowCount * 3) {
          break;
        }
        let movieCard = document.createElement("td");
        movieCard.setAttribute("class","movie-info");
        let index = rowCount * 3 + colCount;
        let movieInfos = document.createElement("div");
        let movieCover = document.createElement("img");
        let movieNameAndYear = document.createElement("a");
        let moviePubDate = document.createElement("span");
        let movieDuration = document.createElement("span");
        let movieGenres = document.createElement("span");
        let movieScore = document.createElement("span");

        movieInfos.setAttribute("class","movie-infos");
        movieCover.setAttribute("class","movie-cover");
        movieCover.setAttribute("src",`${data[index].images.small}`);
        movieNameAndYear.setAttribute("class","infos");
        movieNameAndYear.setAttribute("href",`detail.html?keywords=${data[index].id}`);
        moviePubDate.setAttribute("class","infos");
        movieGenres.setAttribute("class","infos");
        movieDuration.setAttribute("class","infos");
        movieScore.setAttribute("class","movie-rate");

        movieNameAndYear.innerHTML = `${data[index].title}/${data[index].year}`;
        moviePubDate.innerHTML = `${data[index].pubdates.join("/")}`;
        movieDuration.innerHTML = `时长：${data[index].durations.join("/")}`;
        movieGenres.innerHTML = `分类：${data[index].genres.join("/")}`;
        movieScore.innerHTML = `评分：${data[index].rating.average}/10`;

        movieInfos.appendChild(movieNameAndYear);
        movieInfos.appendChild(moviePubDate);
        movieInfos.appendChild(movieGenres);
        movieInfos.appendChild(movieDuration);
        movieInfos.appendChild(movieScore);
        movieCard.appendChild(movieCover);
        movieCard.appendChild(movieInfos);
        movieRow.appendChild(movieCard);
      }
      movieList.appendChild(movieRow);
    }
}

//getDetailById();

function searchByKeyWords(){
  let keywords = document.getElementsByClassName('search-box')[0].value;
  let moviesIdString = movieDatas.filter(value => value.title.indexOf(keywords) > -1).map(value => value.id).join('&');
  window.open(`search.html?movieId=${moviesIdString}`);
}

getAllData()


