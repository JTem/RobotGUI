

console.log("main");
const grid = document.getElementById("grid");

let tabs;
let tab;
document.addEventListener('HeaderClicked', function(event) {
    console.log(event.detail); // Output the button click detail

    tabs = event.detail;

    let activeTab = null;
    tabs.forEach((item) => {
        if (item.classList.contains('active')) {
            activeTab = item;
        }
    });

    console.log(activeTab);
    if(activeTab){

        grid.style.gridTemplateColumns = "60px 700px 1fr";

        switch (activeTab.id) {
            case "home":
                console.log("Active tab is Home");
               
                break;
            case "jogging":
                console.log("Active tab is Jogging");
                
                break;

            case "zero_g":
                console.log("Active tab is ZeroG");
                
                break;

            case "motion":
                console.log("Active tab is Motion");
                
                break;

            case "force_torque":
                console.log("Active tab is Force Torque");
                
                break;

            case "points":
                console.log("Active tab is Points");
                
                break;

            case "robot_data":
                console.log("Active tab is Robot Data");
                
                break;

            case "settings":
                console.log("Active tab is Settings");
          
                break;

            case "tools":
                console.log("Active tab is Tools");
                
                break;

            case "ai":
                console.log("Active tab is AI");
                
                break;

            case "safety":
                console.log("Active tab is Safety");
                
                break;

            case "diagnostics":
                console.log("Active tab is Diagnostics");
                
                break;
            
            default:
                console.log("Active tab is unknown");
                break;
        }
    
    } else {
        grid.style.gridTemplateColumns = "60px 0px 1fr";
    }

});



console.log(grid);