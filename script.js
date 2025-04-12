// Your api key of rapid api goes here
const MY_API_KEY = ""

async function getYoutubeInfo(videoId){
  const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`;
  const options = {
  	method: 'GET',
  	headers: {
  		'x-rapidapi-key': MY_API_KEY,
  		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  	}
  };

  try {
  	const response = await fetch(url, options);
  	const result = await response.json();
  	document.querySelector(".youtube").style.display = "grid"
    document.querySelector(".fetching").style.display = "none"
    youtube[0].setAttribute("src",result['items'][0]['snippet']['thumbnails']['high']['url'])
    youtube[1].textContent =  result['items'][0]['snippet']['title']
    youtube[2].textContent =  result['items'][0]['snippet']['description']
    youtube[3].textContent =  result['items'][0]['snippet']['channelTitle']
    youtube[4].textContent =  result['items'][0]['statistics']['viewCount']
    youtube[5].textContent =  result['items'][0]['statistics']['likeCount']
    youtube[6].textContent =  result['items'][0]['statistics']['commentCount']

    document.getElementById("video").addEventListener("click",()=>{
      const resolution = document.getElementById("resolution").value;
      chrome.runtime.sendMessage({ action: `video;=;${videoId};=;${resolution}` }, (response) => {
        if (response && response.success) {
          console.log("Result from background:", response.result);
        } else {
          console.error("Failed to get response from background.");
        }
      });
    })
    document.getElementById("audio").addEventListener("click",()=>{
      chrome.runtime.sendMessage({ action: `music;=;${videoId}` }, (response) => {
        if (response && response.success) {
          console.log("Result from background:", response.result);
        } else {
          console.error("Failed to get response from background.");
        }
      });
    })
  } catch (error) {
  	console.error(error);
  }
}


const youtube = document.querySelectorAll(".yt-val");
const instagram = document.querySelectorAll(".insta-val");



async function instagramSetter(videoId) {

  const url = `https://instagram230.p.rapidapi.com/post/details?shortcode=${videoId}`;
  const options = {
  	method: 'GET',
  	headers: {
  		'x-rapidapi-key': MY_API_KEY,
  		'x-rapidapi-host': 'instagram230.p.rapidapi.com'
  	}
  };

  try {
  	const response = await fetch(url, options);
  	const result = await response.json();
  	document.querySelector(".instagram").style.display = "grid"
    document.querySelector(".fetching").style.display = "none"
  	instagram[0].setAttribute("src",result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['carousel_media'][0]['video_versions'][0]['url'])
    instagram[1].textContent = result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['user']['full_name']
    instagram[1].addEventListener("click",()=>{
      var link = `https://www.instagram.com/${result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['user']['username']}`
      chrome.tabs.create({ url: link });
    })
    instagram[2].textContent = result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['caption']['text']
    instagram[3].textContent = result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['view_count']
    instagram[4].textContent = result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['like_count']
    instagram[5].textContent = result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['comment_count']
    document.getElementById("insta-download").addEventListener("click",()=>{
      chrome.tabs.create({ url: result['data']['xdt_api__v1__media__shortcode__web_info']['items'][0]['carousel_media'][0]['video_versions'][0]['url'] });
    })

  } catch (error) {
  	console.error(error);
  }

  
}


document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  var link = tab.url;
  if(link.includes("youtube.com")){
    link = link.split("v=")[1];
    link = link.split("&")[0];
    document.querySelector(".fetching img").setAttribute("src","./icon/youtube.png")
    document.querySelector(".fetching h6").textContent = link;
    getYoutubeInfo(link)
  }else if(link.includes("instagram.com") && link.includes("/p/")){
    link = link.split("/p/")[1];
    link = link.split("/")[0];
    document.querySelector(".fetching img").setAttribute("src","./icon/instagram.png")
    document.querySelector(".fetching h6").textContent = link;
    instagramSetter(link);
  }else{
    document.querySelector(".fetching").style.display = "none"
    document.querySelector(".else").style.display = "block"
    document.querySelector(".else a").setAttribute("href",link)
    document.querySelector(".else a").textContent = link;
  }

});









