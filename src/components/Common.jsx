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
            name = "Role";
            break;

        case "plans":
            name = "Plan";
            break;

        case "roomcategories":
            name = "Room category";
            break;

        case "iddocuments":
            name = "ID document";
            break;
                
        case "bookingagents":
            name = "Booking agent";
            break;

        case "employees":
            name = "Employee";
            break;

        case "rooms":
            name = "Room";
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
