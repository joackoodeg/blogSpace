const blogList = document.getElementById("blog-list");
const titleEl = document.getElementById("post-title");
const bodyEl = document.getElementById("post-body");
const form = document.getElementById("new-post");

let postArr = [];

function renderPosts(){
    blogList.innerHTML="";
    postArr.forEach(post => {
        blogList.innerHTML += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr/>
        `
    });
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts",{method:"GET"})
    .then(response => response.json())
    .then(data => {
        postArr = (data.splice(0,20)) 
    renderPosts();
})


form.addEventListener('submit',function(e){
    e.preventDefault(); /* prevent the refresh  when submit btn is clicked */
    
    const postTitle=titleEl.value;
    const postBody=bodyEl.value;
    
    const data = {
        title: postTitle,
        body: postBody
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(res => res.json())
    .then(post => {
        postArr.unshift(post);
        renderPosts();
    })

    form.reset();
})