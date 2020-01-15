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
        if(rowCount * 3 + colCount === 100 || data.length <= colCount) {
          break;
        }
        let movieCard = document.createElement("td");
        movieCard.setAttribute("class","movie-info");
        let index = rowCount * 3 + colCount;
        let movieInfos = document.createElement("div");
        let movieCover = document.createElement("img");
        let movieNameAndYear = document.createElement("span");
        let moviePubDate = document.createElement("span");
        let movieDuration = document.createElement("span");
        let movieGenres = document.createElement("span");
        let movieScore = document.createElement("span");

        movieInfos.setAttribute("class","movie-infos");
        movieCover.setAttribute("class","movie-cover");
        movieCover.setAttribute("src",`${data[index].images.small}`);
        movieNameAndYear.setAttribute("class","infos");
        moviePubDate.setAttribute("class","infos");
        movieGenres.setAttribute("class","infos");
        movieDuration.setAttribute("class","infos");
        movieScore.setAttribute("class","movie-rate");

        movieNameAndYear.innerHTML = `${data[index].title}/${data[index].year}`;
        moviePubDate.innerHTML = `${data[index].pubdates.join("/")}`;
        movieDuration.innerHTML = `${data[index].durations.join("/")}`;
        movieGenres.innerHTML = `${data[index].genres.join("/")}`;
        movieScore.innerHTML = `${data[index].rating.average}/10`;

        movieInfos.appendChild(movieNameAndYear);
        movieInfos.appendChild(moviePubDate);
        movieInfos.appendChild(movieGenres);
        movieInfos.appendChild(movieScore);
        movieCard.appendChild(movieCover);
        movieCard.appendChild(movieInfos);
        movieRow.appendChild(movieCard);
      }
      movieList.appendChild(movieRow);
    }
}
// getDetailById();

getAllData();
function searchByKeyWords(){
  let keyWords = document.getElementsByClassName('search-box')[0].value;
  console.log(keyWords);
  // ajax({
  //   url: BASIC_URL + "/v2/movie/search?q=" + keyWords,
  //   method: "GET",
  //   success: function(responseText) {
  //     console.log(responseText);
  //   }, 
  // });
}

function getDetailById() {
  ajax({
    url: BASIC_URL + "/v2/movie/subject/" + movieId,
    method: "GET",
    success: function(responseText) {
    console.log(responseText);
    }, 
  });
}





