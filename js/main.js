/***todo */
console.log();
function main() {
    var dots2 = document.getElementById("dots2");
    var moreText2 = document.getElementById("more2");
    var btnText2 = document.getElementById("myBtn2");

    if (dots2.style.display === "none") {
        dots2.style.display = "inline";
        moreText2.style.display = "none";
    } else {
        dots2.style.display = "none";
        btnText2.innerHTML = "Буцаах";
        moreText2.style.display = "inline";
    }
};
function seeMore(el) {
    let p = el.parentElement.querySelector("p")
    if (el.classList.contains("active")){
        el.classList.remove("active");
        p.style.maxHeight = '260px';
    } else {
        el.classList.add("active")
        p.style.maxHeight = el.parentElement.querySelector("p").scrollHeight+'px'
    }
}

function seeMore1(el) {
    let div = el.parentElement.querySelector("div")
    if (el.classList.contains("active")){
        el.classList.remove("active");
        div.style.maxHeight = '350px';
    } else {
        el.classList.add("active")
        div.style.maxHeight = el.parentElement.querySelector("div").scrollHeight+'px'
    }
}

function seeMore(el) {
    let p = el.parentElement.querySelector("p")
    if (el.classList.contains("active")){
        el.classList.remove("active");
        p.style.maxHeight = '260px';
    } else {
        el.classList.add("active")
        p.style.maxHeight = el.parentElement.querySelector("p").scrollHeight+'px'
    }
}

function seeMore1(el) {
    let div = el.parentElement.querySelector("div")
    if (el.classList.contains("active")){
        el.classList.remove("active");
        div.style.maxHeight = '350px';
    } else {
        el.classList.add("active")
        div.style.maxHeight = el.parentElement.querySelector("div").scrollHeight+'px'
    }
}