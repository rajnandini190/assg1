let counter = 0;

function unique_id(){
    counter = counter + 1;
    return counter;
}
function creating_arrow(){
    let arrow_icon = document.createElement("span");
    arrow_icon.classList.add("rotate")
    arrow_icon.setAttribute("onclick" , "checkClassCollapse(this)")
    arrow_icon.innerHTML = "&#10148;"
    return  arrow_icon;
}

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

function createFileNode(parentObj, fileName , fileType ){
    let newObj ={
        type: fileType,
        name: fileName ,
        id: unique_id(),
        children: null,
        level: (parentObj.level) + 1
    }
    return newObj;
}

const createFolderNode = ( folderName , folderType , parentObj ) => {
   
    let newObj ={
        type: folderType,
        name: folderName ,
        id: unique_id(),
        children:[],
        level: (parentObj.level) + 1
    }
    return newObj;
}

const deleteNode = (id, childrenArray , deleteId) => {

    for (let i = 0 ; i < childrenArray.length ; i++) {

        if (id == childrenArray[i].id) {
            
            let index = childrenArray[i].children.findIndex((obj) => obj.id === deleteId);
            console.log("childrenArray" , childrenArray[i])
            childrenArray[i].children.splice(index , 1);
            return;                
        }
        if (childrenArray[i].children != null) {
            deleteNode(id, childrenArray[i].children , deleteId); // Recursively search nested children
        }
    }

}
function createFile(name , obj){

    let main_div = document.createElement("div");
    main_div.id = obj.id; 
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


const Iterate_Children_for_print = ( main_div ,  children ) => {
    // console.log(children)
    for(let obj of children){
        let addingdiv
        // console.log(obj)
        if(obj.type == "file"){
            addingdiv = createFile(obj.name , obj);
        }
        else if(obj.type === "folder"){
            addingdiv = createFolder(obj.name , obj);
        }
        main_div.appendChild(addingdiv);
        if(obj.children != null  ){
            Iterate_Children_for_print( addingdiv.lastElementChild , obj.children )
        }
    }
}
const Iterate_Children_And_Push = ( findId ,  children , newObject  ) => {
     console.log(newObject);

    for(let obj of children){
        if(findId === obj.id){
            obj.children.push(newObject)
            return;
        }

        if(obj.children != null){
            Iterate_Children_And_Push( findId , obj.children , newObject );
        }
    }
}
const Iterate_Data_For_Getting_ParentObj = ( findId ,  children ) => {
    let ans;
    // console.log(findId)
    for (let obj of children) {
        if (findId == obj.id) {
            return obj;
        }

        if (obj.children != null) {
            ans = Iterate_Data_For_Getting_ParentObj(findId, obj.children);
            if (ans) {
                // console.log(obj)
                return ans; // Return the answer if found in deeper levels
            }
        }
    }
    return null; // Return null if not found
}
function checkFileName(event){
    // console.log(event.value)
    if(typeof event === "string"){
        fileName = event
    }else{
        fileName = event.value;
    }
    let regex = /^([a-zA-Z]){1,10}$/;
    let regex1 = /^([a-zA-Z]){0}$/;
    
    if(!fileName.match(regex) && !fileName.match(regex1)){
      
        alert("File name should be less than 10 char & it should not contain number!!")
    }
}



