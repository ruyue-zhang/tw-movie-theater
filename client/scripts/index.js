let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = '26942674';

function searchByKeyWords(){
  let keywords = document.getElementsByClassName('search-box')[0].value;
  //按照keywords搜索，得到movieId,将movieId作为参数进行传递
  window.open("detail.html?movieId=" + keyWords);
}





