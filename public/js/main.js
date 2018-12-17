window.onload = function() {
  //AJAX TAB NAV
  let imgs;
  let filters = document.querySelectorAll(".filter");
  filtersArray = Array.prototype.slice.call(filters);
  let itemTab = document.querySelectorAll(".list-item-tab");
  itemTab.forEach(item => {
    item.addEventListener("click", function() {
      itemTab.forEach(it =>{
        it.classList.remove('is-active')
      })
      item.classList.add("is-active");
      imgs = document.querySelectorAll('.item-img')
    });
  });

  getImages("Todo");

  filtersArray.forEach(filter => {
    filter.addEventListener("click", function(e) {
      getImages(filter.text);
      e.preventDefault();
    });
  });

  //PRELOADER
  let preloader = document.querySelector("#preloader");
  setTimeout(function() {
    preloader.style.display = "none";
  }, 2000);

  //DATE
  let dateDiv = document.querySelector("#date");
  let date = new Date();
  dateDiv.innerHTML += date.getFullYear();

  //MODAL
  let exitBtn = document.querySelectorAll('.item-img .modal .exitBtn')
exitBtn.forEach( btn =>{
 console.log(btn)
})
};

const getImages = function(params) {
  let container = document.querySelector("#container-img");
  let noFoundImages = `<div class='container'>
  <div class='columns'>
  <div class='column is-half is-offset-one-quarter is-size-1 has-text-warning' style='text-align:center; font-family: 'Raleway', sans-serif;'>
  <p>No hay imagenes</p>
  </div>
  </div>
    </div>`;
  var xhttp = new XMLHttpRequest();
  container.innerHTML = "";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is read;
      let data = JSON.parse(this.responseText);
      data = data.images;
      if (data) {
        for (var i in data) {
          let output = `<div class='item-img' onclick='modal(this)'>
                              <img data-aos="fade-up-right" class='img-i item-img'  src='images/${data[i].image}'/>
                              <div class='overlay'><p>Aumentar</p></div>
                              
                              <div class='modal'>
                                <img src='images/${data[i].image}'>
                                <span class='exitBtn' >X</span>
                              </div>
                        </div>
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
  
};

function modal(e){
  e = e.querySelector('.modal')
  e.classList.toggle('is-active')
}

