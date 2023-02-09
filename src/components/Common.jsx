export const subStr = (text, len) => {
    return text.length > len ? text.substr(1, len) + " ..." : text;
}

export const  getPage = (baseURL, url) => {
    let component = "";
    const params = url.replace(baseURL, "");
    const paramArr = params.split("/");

    if (paramArr.length > 0) {
      component = paramArr[0];
    } else {
      component = params;
    }
    
    return component;
};

export const getFirstName = (name) => {
    const names = name.split(" ");
    return names.length > 0 ? names[0] : name;
};

export const getPageName = (selectedCompont) => {
    let name = "";

    switch(selectedCompont) {
        case "accesslevels":
            name = "Roles";
            break;

        case "iddocuments":
            name = "ID Documents";
            break;

        case "employees":
            name = "Employees";
            break;
        
        case "plans":
            name = "Plans";
            break;

        case "roomcategories":
            name = "Room Categories";
            break;

        case "rooms":
            name = "Rooms";
            break;
                        
        default:
            name = "";
    
        }

    return name;
};

export const getAccessLevel = (accessLevelArray) => {
    let names = "";

    accessLevelArray && accessLevelArray.map((item) => {
        names === "" ? names = item.name : names = names + ", " + item.name;
    })

    return names;
};
