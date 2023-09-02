
const Dispatcher = {
    callbacks: [], 

    register(callback){
        this.callbacks.push(callback);
    },

    dispatch(action){
        this.callbacks.forEach(callback => callback(action))
    }
};


const File_Folder_Store ={
    state:[
        {
            type:"folder",
            name:"Root",
            id: unique_id(),
            level:0,
            children:[
                
            ]
        }
     ]
    ,

    getState(){
        return this.state;
    }
    ,
    handleAction(Action){
        if(Action.type === "AddFolder"){
            
            Iterate_Children_And_Push(Action.parent_id , this.state , Action.folderobj)
            console.log("after element adding "  , this.state)
        }
        else if(Action.type === "AddFile"){
            Iterate_Children_And_Push(Action.parent_id , this.state , Action.fileobj) 
         
        }
        else if(Action.type === "Delete"){
            
            deleteNode(Action.parentid , File_Folder_Store.state , Action.delete_child_id )
            console.log("updated state after delete " , this.state)
        }
    },

    emitChange(){
        console.log("store changes " , this.state)
    }
}


const ExplorerView = {
    init(){
        console.log("init function call");
        counter=0;
        this.rootElement = document.getElementById("main");
        console.log( "root element  " , this.rootElement)
        this.render();
    },

    render(){
        console.log("render function call");
        const dataStore = File_Folder_Store.getState();
        this.rootElement.innerHTML = "";
        counter = 0 ;
        Iterate_Children_for_print(this.rootElement , dataStore);
    }
}

// Action Creators
function Add_Folder_Action(folderobj , parent_id){
    return {
        type : "AddFolder",
        folderobj,
        parent_id
    };
}
function Add_File_Action(fileobj , parent_id){
    return {
        type : "AddFile",
        fileobj,
        parent_id
    }
}
function Delete_Action(parentid , delete_child_id){
    return {
        type : "Delete",
        parentid,
        delete_child_id
    }
}


Dispatcher.register(File_Folder_Store.handleAction.bind(File_Folder_Store));


ExplorerView.init();




const onClickFolder = (event)=>{
    
    let inputValue = document.getElementById("InputValueId").value; 
   
    let parentObj = Iterate_Data_For_Getting_ParentObj(event.parentNode.id , File_Folder_Store.state);
    let new_obj = createFolderNode(inputValue , "folder" , parentObj );
    console.log("new object in onclick folder function " , new_obj);

   
    Dispatcher.dispatch(Add_Folder_Action(new_obj , parentObj.id));
    ExplorerView.render()
}  

const onClickFile = (event)=>{
      
    let inputValue = document.getElementById("InputValueId").value;

    let parentObj = Iterate_Data_For_Getting_ParentObj(event.parentNode.id , File_Folder_Store.state);
    let new_obj = createFileNode(parentObj, inputValue , "file" );
    console.log("new object in onclick file function " , new_obj);
  
   
    Dispatcher.dispatch(Add_File_Action(new_obj , parentObj.id));
    ExplorerView.render()
     
}

const onClickDelete = (event) =>{ 
    let parentId = event.parentNode.parentNode.id;
    console.log(parentId)
    Dispatcher.dispatch(Delete_Action(parentId , event.parentNode.id));
    ExplorerView.render()
}
let parentid = 0;


function unique_id(){
    parentid++;
    return parentid;
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
function creating_arrow(){
    let arrow_icon = document.createElement("span");
    arrow_icon.classList.add("rotate")
    arrow_icon.setAttribute("onclick" , "checkClassCollapse(this)")
    arrow_icon.innerHTML = "&#10148;"
    return  arrow_icon;
}


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
    
    
    let children_div = document.createElement("div");
    children_div.id = unique_id();
    
    main_div.appendChild(children_div)
    
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









