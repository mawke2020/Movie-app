

const Img_path ='https://image.tmdb.org/t/p/w1280'
const Search_URL= 'https://api.themoviedb.org/3/search/movie?&api_key=4b19dad32b4b1e92183ebd3b5afa075c'
const   url = `https://moviehungershaven.xyz/tplayer/npls1.php?id=`;
const Apikey = '4b19dad32b4b1e92183ebd3b5afa075c'
// selecting elements from DOM
const btnElement= document.getElementById("search-movie");
const inputElement= document.getElementById("inputvalue");
const movieSearchBlock = document.getElementById('movies-searchable');
const movieContiner= document.getElementById("movies-continer");
const swiperchance = document.getElementById("swiper-wrapper");
const x = 
Math.floor(Math.random() * 20); 


const  API_URL= `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4b19dad32b4b1e92183ebd3b5afa075c&page=${x}`;




function DynamicUrl(path){
    const url = `https://api.themoviedb.org/3/${path}?&api_key=4b19dad32b4b1e92183ebd3b5afa075c&page=${x}`;
    return url
}
function requestMovie(url,onComplete,onError){
    fetch((url))
    .then((res)=> res.json())
    .then((onComplete))
    .catch((onError))

}


function  OnSearchMovie(value){
    const seearchkey = "search/movie";

    const NewUrl = Search_URL+"&query="+ inputElement.value
    requestMovie(NewUrl , Rendersearch ,handleError)
}



function CreateMovie(data,content){

    content.innerHTML = `
    <p id="content-close">x</p>
    <div class="movie-detials"> 
    <h1>${data.title}</h1>
    <a href="${url+data.id}">Watch movie from here !</a>
    <div>`
    const videos = data.results
    const length = videos.length > 1? 1: videos.length;
    const iframeContiner = document.createElement("div");

    for(let i = 0 ;i  < length; i++){
        const video = videos[i]
        const iframe = CreateIframe(video)
        iframeContiner.appendChild(iframe);
        content.appendChild(iframeContiner);
    }
    
}



function CreateMoviesContiner(movieslist, title=""){
    const  movieElement = document.createElement("div");
    movieElement.setAttribute("class","movie");

   const movieTemplete= `
    <h2 class="header">${title}</h2>
    <section class="section">
    ${movieslist.map((item)=>{
        if (item.poster_path!==null){
          return `<img src="${Img_path+item.poster_path}"
                  id="${item.id}">`;}})}
    </section>
    <div class="content">
        <p id="content-close">x</p>
        <div class="movie-detials"> 
        <h1>movies</h1>
        
        <div>
    </div>`
    
    
    movieElement.innerHTML=movieTemplete;
    return movieElement;
}


function CreateIframe(video){
    const iframe = document.createElement("iframe");
    iframe.src=`http://youtube.com/embed/${video.key}`
    iframe.width = 1200;
    iframe.height = 500;
    iframe.allowFullscreen = true;
    return iframe
}




function Rendersearch(data){
    movieSearchBlock.innerHTML = ""
    const movies = data.results.slice(0,6)

    const movieBlock = CreateMoviesContiner(movies);
    movieSearchBlock.appendChild(movieBlock);
   
}





function RenderMovieContiner(data){

    const movies = data.results.slice(0,6)
    console.log(data.results.slice(0,6))
    
    const movieBlock = CreateMoviesContiner(movies,this.title);
    movieContiner.appendChild(movieBlock);
}

function RenderMovieSlideshow(data){

    const movies = data.results.slice(0,11)
    console.log(data.results.slice(0,11))
    
    const movieBlock =CreateMoviesSliderShow(movies);
    swiperchance.appendChild(movieBlock);
}

function handleError(error){
    console.log("error", error)
}


/// events 
btnElement.addEventListener("click" ,function(event){
    movieSearchBlock.innerHTML=''
    event.preventDefault()
    const value= inputElement.value;
    OnSearchMovie(value)
    inputElement.value=""
});



document.addEventListener("click",function(event){
     const target= event.target
     if(target.tagName.toLowerCase()==="img"){
        console.log("event ",)
         const IDmovie= target.id
         console.log("your video id ", IDmovie)
         const section = event.target.parentElement;
         const content = section.nextElementSibling;
         content.classList.add("conten-display")

         const moviesearch = `movie/${IDmovie}/videos`;
         const NewUrl = DynamicUrl(moviesearch)

        fetch((NewUrl))
        .then((res)=> res.json())
        .then((data)=>CreateMovie(data,content))
        .catch((Error)=>{
            console.log("eror",Error)
        })
     }
     if(target.id ==="content-close"){
         content = target.parentElement
         content.classList.remove("conten-display")
     }
})



function TopRatedMovie(value){
    const seearchkey = "movie/top_rated";
    const NewUrl = DynamicUrl(seearchkey)+"&query="+ value
    const render = RenderMovieContiner.bind({title : "Top Rated  Movies"})
    requestMovie(NewUrl , render ,handleError)
}
function nowplayingMovie(value){
    const seearchkey = "movie/now_playing";
    const NewUrl = DynamicUrl(seearchkey)+"&query="+ value
    const render = RenderMovieContiner.bind({title : "Now playing Movies"})
    requestMovie(NewUrl , render ,handleError)
}
function popularMovie(value){
    const seearchkey = "movie/popular";
    const NewUrl = DynamicUrl(seearchkey)+"&query="+ value
    const render = RenderMovieContiner.bind({title : "Popular Movies"})
    requestMovie(NewUrl , render ,handleError)
}
function upComingMovie(value){
    const seearchkey = "movie/upcoming";
    const NewUrl = DynamicUrl(seearchkey)+"&query="+ value
    const render = RenderMovieContiner.bind({title : "Up Coming Movies"})
    requestMovie(NewUrl , render ,handleError)
}




function CreateMoviesSliderShow(movieslist){
    const  movieElement = document.createElement("div");
    movieElement.setAttribute("class","swiper-slide");

   const movieTemplete= `
   
  
    ${movieslist.map((item)=>{
        if (item.poster_path!==null){
          return `<img src="${item.poster_path}" alt="" id="img_slider">`;}})}`
   
    
    movieElement.innerHTML=movieTemplete;
    return movieElement;
}








TopRatedMovie()
upComingMovie()

nowplayingMovie()
popularMovie()