window.onload = function() {
  getImages("Todo");
  
  setTimeout(function(){
    const images=Array.from(document.querySelectorAll('.item-gallery'))
    images.forEach(img => img.addEventListener('click',modal))
    console.log(images)
  },3000)
}
function displayModal(url){
  let modal = document.querySelector('.modal')
  let modalImg = modal.querySelector('.image-modal img')
  console.log(modalImg)
  modalImg.src=url
  modal.style.display='flex'
  
}

function exitBtn(){
  let modal = document.querySelector('.modal')
  let modalImg = modal.querySelector('.image-modal img')
  modalImg.src=''
  modal.style.display='none'
}
function modal(e){
  let urlImg = e.target.src
  displayModal(urlImg)
}

const getImages = function(params) {
  let container = document.querySelector(".items");
  var xhttp = new XMLHttpRequest();
  container.innerHTML = "";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is read;
      let data = JSON.parse(this.responseText);
      data = data.images;
      container.innerHTML = `<div class="item intro span-2">
      <h1>Nadia Bueri</h1>
      <p>Galeria de fotos, por la fotografa amateur Nadia.</p>
</div>`
      if (data) {
        for (var i in data) {
          
          let output = `<article class="item  thumb span-1"><a href="#" class="image"><img class='item-gallery' src="images/${data[i].image}" alt=""></a></article>

                              `;
          if (data[i].tags[0] === params) {
            container.innerHTML += output;
            //    console.log(data[i].tags[0],data[i].image)
          } else if (params === "Todo") {
            container.innerHTML += output;
            // console.log(data[i].tags[0],data[i].image)
          }
        }
      }
    }
  };
  xhttp.open("GET", "/images/allimages", true);
  xhttp.send();

}
