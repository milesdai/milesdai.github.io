const base = "../projects/"
projects = [
    {
        "title": "Laser Engraved Keychains",
        "description": "Easy customization with a laser cutter.",
        "link": base + "keychains/index.html",
        "tags": ["DIY"],
        "thumbnail": "keychains/keychains_2.jpg"
    },
    {
        "title": "VU Meter",
        "description": "A volume indicator powered by an Attiny 26. Created for Next Make as a soldering activity for prefrosh at MIT.",
        "link": base + "vumeter/index.html",
        "tags": ["Next Make", "PCB Design"]
    },
    {
        "title": "RFID Lab",
        "description": "An investigation into RFID entry control systems. This work was done as part of designing a lab for MIT's 6.002 course.",
        "link": base + "rfid/index.html",
        "tags": ["Coursework"],
        "thumbnail": "rfid/modulation2.png"
    },
    {
        "title": "Induction Heater",
        "description": "Final project for 6.1311 Power Electronics Lab. An inverter driving a work coil produces contactless heating.",
        "link": base + "inductionheater/index.html",
        "tags": ["Power Electronics", "Coursework"],
        "thumbnail": "inductionheater/inductionHeaterSetup.jpg"
    },
    {
        "title": "Schlieren Imaging",
        "description": "Exploration of different methods for visualizing turbulence using Schlieren techniques.",
        "link": base + "schlieren/index.html",
        "tags": ["Coursework"],
        "thumbnail": "schlieren/solderingIron.JPG"
    },
    {
        "title": "Fountain of Youth",
        "description": "A demonstration of the stroboscopic effect using an oscillating stream of water. Created with Next Make.",
        "link": base + "fountainofyouth/index.html",
        "tags": ["Next Make"]
    },
    {
        "title": "Harry Potter Clock",
        "description": "Recreation of the Weasley family clock that shows the location of each family member using IoT.",
        "link": base + "hpclock/index.html",
        "tags": ["Hackathon"],
        "thumbnail": "hpclock/clockfront.jpg"
    }, 
    // {
    //     "title": "Boba Machine",
    //     "description": "An automated machine for making boba from tea bags and dried tapioca. Created with Next Make.",
    //     "link": base + "bobamachine/index.html",
    //     "tags": ["Next Make"],
    //     "thumbnail": "bobamachine/boba.jpg"
    // },
    {
        "title": "Electric Piano",
        "description": "A tunable PCB electric piano designed as a soldering activity for prefrosh at MIT.",
        "link": base + "electricpiano/index.html",
        "tags": ["Next Make", "PCB Design"],
        "thumbnail": "electricpiano/pianopcb.jpg"
    },
    {
        "title": "Methyl Salicylate Synthesis",
        "description": "Organic synthesis of Oil of Wintergreen from household materials.",
        "link": base + "methylsalicylate/index.html",
        "tags": ["Chemistry"],
        "thumbnail": "methylsalicylate/methylsalicylate.jpg"
    },
    {
        "title": "Low Cost Colorimeter",
        "description": "Digital Electronics final project. An off-the-shelf device to measure light absorbance of colored solutions.",
        "link": base + "colorimeter/index.html",
        "tags": ["Chemistry", "Coursework"],
        "thumbnail": "colorimeter/colorimeter1.jpg"
    }, 
    {
        "title": "Robot Arm",
        "description": "A leader-follower robot arm for Carmel High School's 2016 Science Olympiad season.",
        "link": base + "robotarm/index.html",
        "tags": ["Science Olympiad"],
        "thumbnail": "robotarm/lightuprobot.jpg"
    },
    /*
    {
        "title": "",
        "description": "",
        "link": base + /index.html""
    },*/
];

/* Colors:
primary, link, info, success, warning, danger
*/
var tags = {
    "Coursework": "is-success",
    "Next Make": "is-info",
    "Power Electronics": "is-danger",
    "PCB Design": "is-link",
    "Chemistry": "is-warning",
    "Science Olympiad": "is-primary",
    "Hackathon": "is-light",
    "DIY": "is-success"
};

var tileHolder = document.getElementById("tiles");
var numRows = Math.floor(projects.length / 3) + 1;
let ancestor = null;
for(let i = 0; i < projects.length; i++) {
    if(i % 3 === 0) {
        ancestor = document.createElement("div");
        ancestor.className = "tile is-ancestor";
        tileHolder.appendChild(ancestor);
    }
    let tileParent = document.createElement("div");
    tileParent.className = "tile is-4 is-parent";
    ancestor.appendChild(tileParent);

    let tileChild = document.createElement("div");
    tileChild.className = "tile is-child";
    tileParent.appendChild(tileChild);

    let link = document.createElement("a");
    link.href = projects[i].link;
    tileChild.appendChild(link);

    let box = document.createElement("div");
    box.className = "box";
    link.appendChild(box);

    let title = document.createElement("p");
    title.className = "title";
    title.innerHTML = projects[i].title;
    box.appendChild(title);

    let description = document.createElement("p");
    description.innerHTML = projects[i].description;
    box.appendChild(description);

    if(projects[i].thumbnail) {
        let thumbnailContainer = document.createElement("div");
        thumbnailContainer.className = "thumbnail center";
        box.appendChild(thumbnailContainer);

        let thumbnail = document.createElement("img");
        thumbnail.className = "responsive";
        thumbnail.src = "../projects/" + projects[i].thumbnail;
        thumbnailContainer.appendChild(thumbnail);
    } else {
        box.appendChild(document.createElement("br"));
    }

    let tagHolder = document.createElement("div");
    tagHolder.className = "tags";
    box.appendChild(tagHolder);

    for(let j = 0; j < projects[i].tags.length; j++) {
        let tag = document.createElement("span");
        tag.className = "tag";
        let label = projects[i].tags[j];
        if (label in tags) {
            tag.classList.add(tags[label]);
        }
        tag.innerHTML = label;
        tagHolder.appendChild(tag);
    }

}