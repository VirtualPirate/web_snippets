const axios = require('axios').default;

async function getInstagramInfo (profileName) {
    const baseUrl = "https://www.instagram.com";
    const profileUrl = `${baseUrl}/${profileName}`;
    const jsonDataUrl = `${profileUrl}/?__a=1`;
  
    const response = await axios(jsonDataUrl, {headers: {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36"}});
    // const jsonData = await response.json();
    // const pictures = jsonData.graphql.user.edge_owner_to_timeline_media.edges;
  
    if (response) {
      return response;
    } else {
      throw new Error(response);
    }
}

function getFollowerCount(r){
    return r.data.graphql.user.edge_followed_by.count
}

function getFollowedCount(r){
    return r.data.graphql.user.edge_follow.count
}

function getProfileURL(r){
    return r.data.graphql.user.profile_pic_url
}

function getProfileURL_HD(r){
    return r.data.graphql.user.profile_pic_url_hd
}

function getPostCount(r){
    return r.data.graphql.user.edge_owner_timeline_media.count
}

getInstagramInfo("artazasameen").then(res => {
    // const userInfo = {
    //     followers: getFollowerCount(res),
    //     followed: getFollowedCount(res),
    //     profile: getProfileURL(res),
    //     posts: getPostCount(res),
    // }

    console.log(res)
})