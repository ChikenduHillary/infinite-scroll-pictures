const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = []

let imagesToLoad = 5
const apiKey = 'G_XpzQRbjEOtM7y4i6_lzjMRvKs0mftEE_Cke3z6u3o';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesToLoad}`;

function setAttributes(item, attributes){
    for(const key in attributes){
        item.setAttribute(key, attributes[key])
    }
}

function imageLoaded(){
    imagesLoaded++
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        imagesToLoad = 15;
    }
    
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;

    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotos();
    }catch(error){
        // Errors Here
    }
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }

})

// On Load
getPhotos();

