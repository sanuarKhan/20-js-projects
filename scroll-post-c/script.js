const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API

const getPosts = async ()=>{
const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

const data = await res.json();

return data;
}

// show posts In DOM

const showPost = async ()=>{
const posts = await getPosts();

posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number"> ${post.id} </div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    
    </div>`;

    postsContainer.appendChild(postEl);
});
}

// show loading & fetch more posts

const showLoading = ()=>{
    loader.classList.add('show');

    setTimeout( ()=>{
        loader.classList.remove('show');
        setTimeout(()=>{
            page++;
            showPost();
        }, 300);
    },1000);
}
// filter post control

const filterPost = (e)=>{
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const postBody = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || postBody.indexOf(term) >-1){
           post.style.display = 'flex'; 
        } else{
            
            post.style.display = 'none'
        
        }
    })

}

// show initial posts

showPost();

// setting scroll event
window.addEventListener('scroll', ()=>{
    const {scrollTop , scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + scrollHeight >= clientHeight -5){
        showLoading()
    }
})

// filter event control

filter.addEventListener('input', filterPost)



