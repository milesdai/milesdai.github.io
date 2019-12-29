var headers = ['Home', 'About', 'Projects', 'Resume', 'Blog', 'Contact'];

const baseURL = "http://milesdai.github.io/"
var links = {
    "Home": '',
    "About": 'about/index.html',
    "Projects": 'projects/index.html',
    "Resume": 'resume/index.html',
    "Blog": 'blog/index.html',
    "Contact": 'contact/index.html'
};

var nav = document.getElementById('navbar');
nav.className = "navbar is-fixed-top";

let inner_navbar = document.createElement("div");
inner_navbar.className = "container";
navbar.appendChild(inner_navbar);

var navBrand = document.createElement("div");
navBrand.className = "navbar-brand";
inner_navbar.appendChild(navBrand);

let burger = document.createElement("a");
navBrand.appendChild(burger);
burger.className = "navbar-burger burger";
burger.id = "burger";
burger.setAttribute("data-target", "navbar");
burger.setAttribute("onclick", "document.querySelector('.navbar-menu').classList.toggle('is-active');document.querySelector('#burger').classList.toggle('is-active')");
let first_blank_span = document.createElement("span");
let second_blank_span = document.createElement("span");
let third_blank_span = document.createElement("span");
burger.appendChild(first_blank_span);
burger.appendChild(second_blank_span);
burger.appendChild(third_blank_span);

let menu = document.createElement("div");
menu.className = "navbar-menu";
inner_navbar.appendChild(menu);
let start = document.createElement("div");
menu.appendChild(start);
start.className = "navbar-start";

for(var i = 0; i < headers.length; i++) {
    header = headers[i];
    var nav_item = document.createElement("a");
    nav_item.className = "navbar-item";
    nav_item.href = baseURL + links[header];
    // nav_item.text = header;
    var nav_item_text = document.createElement("div");
    nav_item_text.innerText = header;
    nav_item_text.className = "navbar-item-text";
    nav_item.appendChild(nav_item_text);
    start.appendChild(nav_item);
}

// Change section spacing to medium
var sec = document.getElementsByClassName('section')[0];
sec.classList.toggle("is-medium");
