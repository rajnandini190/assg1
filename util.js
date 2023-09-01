// pure function
let parentid = 0;

// function for creating unique id ====================================================

function unique_id(){
    parentid++;
    return parentid;
}

// functions for creating button and icons  =============================================


function creating_button(){
    let folder_button = document.createElement("button");
    folder_button.innerText = "📁";
    folder_button.classList.add("sub-icon")
    folder_button.setAttribute("onclick" , "onClickFolder(this)")

    let file_button = document.createElement("button")
    file_button.innerHTML = "&#128196;"
    file_button.classList.add("sub-icon")
    file_button.setAttribute("onclick" , "onClickFile(this)")

    let delete_button = document.createElement("button")
    delete_button.innerHTML = " &#x2715;"
    delete_button.classList.add("sub-icon")
    delete_button.setAttribute("onclick" , "onClickDelete(this)")
   
    return {folder_button , file_button , delete_button};
}
function creating_arrow(){
    let arrow_icon = document.createElement("span");
    arrow_icon.classList.add("rotate")
    arrow_icon.setAttribute("onclick" , "checkClassCollapse(this)")
    arrow_icon.innerHTML = "&#10148;"
    return  arrow_icon;
}

// functions for performing operation on list ========================================

function createFileNode(parentObj, fileName , fileType ){
    let newObj ={
        type: fileType,
        name: fileName ,
        id: "FileId" + unique_id(),
        children: null,
        level: parentObj.level + 1
    }
    return newObj;
}

const createFolderNode = ( parentObj , folderName , folderType ) => {
let newObj ={
    type: folderType,
    name: folderName ,
    id: "FolderId"+ unique_id(),
    children:[],
    level: (parentObj.level) + 1
}
    return newObj;
}

const deleteNode = (id, childrenArray , deleteId) => {
   if(id ==="main"){
    id = "main_section"
   }

    for (let i = 0 ; i < childrenArray.length ; i++) {
        if (id === childrenArray[i].id) {
            let childArray = childrenArray[i].children;
            
            let index = childArray.findIndex((obj) => obj.id === deleteId);
            childrenArray[i].children.splice(index , 1);
            return;                
        }
        if (childrenArray[i].children != null) {
            deleteNode(id, childrenArray[i].children , deleteId);  // Recursively search nested children
        }
    }

}


// functions for performing operation on DOM ===============================================

function createFile(name , obj){

    let main_div = document.createElement("div");
    main_div.id = unique_id(); 
    main_div.style.paddingLeft = ((obj.level) * 10) + "px";
    main_div.innerHTML = name;
    let  {delete_button} = creating_button();
    main_div.appendChild(delete_button)
    return main_div
}

function createFolder(name , obj ){

    let main_div = document.createElement("div");
    main_div.id = obj.id;
    main_div.style.paddingLeft = ((obj.level) * 10) + "px";

    let arrow_button = creating_arrow();
    let  {folder_button , file_button , delete_button} = creating_button();
    
    let folder_name = document.createElement("span");
    folder_name.innerText = name;

    main_div.appendChild(arrow_button);
    main_div.appendChild(folder_name)
    main_div.appendChild(folder_button);
    main_div.appendChild(file_button);
    main_div.appendChild(delete_button);
    
    // for appending children
    let children_div = document.createElement("div");
    children_div.id = unique_id();
    
    main_div.appendChild(children_div)
    // console.log(main_div);
    return main_div;
}

const checkClassCollapse = (event) =>{
    let lastchild = event.parentNode.lastElementChild;
    console.log(lastchild)

    if(lastchild.classList.length == 0){
        lastchild.classList.add("collapse");
        event.classList.remove("rotate");
        event.classList.add("normal")
    }
    else{
        lastchild.classList.remove("collapse")
        event.classList.add("rotate");
        event.classList.remove("normal")
    }


}









