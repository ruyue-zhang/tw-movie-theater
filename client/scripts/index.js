let BASIC_URL = 'http://127.0.0.1:8888';
var movieId = '26942674';
const top250 = 'top250'
 getDetailById();
 searchByKeyWords();

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
  getMovies(data.subjects);
}

function getGenres(data) {
  var tempArr = [];
  var genArr = [];
  for(index = 0; index < data.count; ++index) {
    tempArr.push(data[index].genres);
  }
  tempArr.forEach((tItem,index) => {
    tItem.forEach((innerItem,index) => {
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
      continue
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
    let resname = `${res[index]}`;
    resItem.innerHTML = resname;
    typeList.appendChild(resItem);
  }
}

function getMovies(data) {

}

getAllData();
function searchByKeyWords(){
  //let keyWords = '后天'//document.getElementsByClassName('search').value;
  ajax({
    url: BASIC_URL + "/v2/movie/search?q=后天",
    method: "GET",
    success: function(responseText) {
      console.log(responseText);
    }, 
  });
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





