
const tabs = document.querySelectorAll(".scrollable-tabs-container a");

const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");
const rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg");
const tabsList = document.querySelector(".scrollable-tabs-container ul");

const leftArrowContainer = document.querySelector(".scrollable-tabs-container .left-arrow");
const rightArrowContainer = document.querySelector(".scrollable-tabs-container .right-arrow");

const removeAllActiveClasses = () => {
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
       
        
        if(!tab.classList.contains("active")){
            removeAllActiveClasses();
            tab.classList.add("active");
        }else{
            tab.classList.remove("active");
        }
        const event = new CustomEvent('HeaderClicked', { detail: tabs });
        document.dispatchEvent(event);
    });

    tab.addEventListener("mousedown", (e) => {
        dragging = true;
        tabsList.classList.add("dragging");
        e.preventDefault(); // Prevent default behavior of anchor elements
    });
});


const manageArrowIcons = () => {

    const scroll_margin = 10;
    if(tabsList.scrollLeft >= scroll_margin){
        leftArrowContainer.classList.add("active");
    } else {
        leftArrowContainer.classList.remove("active");
    }

    let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - scroll_margin;

    if(tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove("active");
    } else {
        rightArrowContainer.classList.add("active");
    }
};

function scrollingLeft(direction) {
    let scroll_var = 100;
    if (direction == "right"){
        tabsList.scrollLeft += scroll_var;
    }
    else if (direction == "left"){
        tabsList.scrollLeft -= scroll_var;
    }
    
    manageArrowIcons();
}

leftArrow.addEventListener("click",() => scrollingLeft("left"));
rightArrow.addEventListener("click",() => scrollingLeft("right"));



tabsList.addEventListener("scroll", manageArrowIcons);

let dragging = false;

const drag = (e) => {
    if(!dragging) return;
    tabsList.classList.add("dragging");
    tabsList.scrollLeft -= e.movementX;
};
tabsList.addEventListener("mousedown", () => {
    dragging = true;
});

tabsList.addEventListener("mousemove", drag);

document.addEventListener("mouseup", () => {
    tabsList.classList.remove("dragging");
    dragging = false;
});

