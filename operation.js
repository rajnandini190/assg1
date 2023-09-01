// impure function

// iteration function ================================================================

const Iterate_Children_for_print = ( main_div ,  children ) => {

    for(let obj of children){
        let addingdiv
        if(obj.type === "file"){
            addingdiv = createFile(obj.name , obj);
        }
        else{
            addingdiv = createFolder(obj.name , obj);
        }
        main_div.appendChild(addingdiv);
        if(obj.children != null){
            Iterate_Children_for_print( addingdiv.lastElementChild , obj.children )
        }
    }
}
const Iterate_Children_And_Push = ( findId ,  children , newObject  ) => {

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


// Actions Function ========================================================================

const onClickFolder = (event)=>{
    let inputValue = document.getElementById("InputValueId");
    let parentObj = Iterate_Data_For_Getting_ParentObj(event.parentNode.id , data);

    let arrayOfChildren = parentObj.children;

    // console.log(arrayOfChildren)
    for(let obj of arrayOfChildren){
        if(obj.name === inputValue.value){
            alert("The given name is already exist");
            return;
        }
    }
    let newobj =  createFolderNode(parentObj , inputValue.value , "folder");

    Iterate_Children_And_Push(parentObj.id , data, newobj);
    
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;

    Iterate_Children_for_print(main_div , data[0].children )
}

const onClickFile = (event)=>{
    let inputValue = document.getElementById("InputValueId");
    
    let parentObj = Iterate_Data_For_Getting_ParentObj(event.parentNode.id , data);
    let newobj =  createFileNode( parentObj , inputValue.value , "file" );
    
    Iterate_Children_And_Push(parentObj.id , data, newobj);

    // main section children delete
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    Iterate_Children_for_print(main_div , data[0].children )  
}

const onClickDelete = (event) =>{
     let parentId = event.parentNode.parentNode.id;
    deleteNode(parentId , data , event.parentNode.id)
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    Iterate_Children_for_print(main_div , data[0].children )
}

const renameItem = (folderList, index)=>{
    for (let item of folderList) {
        if (item.id == index) {
            let a = prompt("Please enter new file/folder name.");
            let elem = document.getElementById(index);
            let parentObj = findItems(store, elem.parentNode.id);
            for(const child of parentObj.children){
                if(child.name === a){
                    alert("Folder/File with this name already exists in this Folder!, Please try a different name!");
                    return;
                }
            }
            console.log(elem);
            let childCount = elem.childElementCount;
            if(a!=null && a!=""){
                console.log(checkFileName(a));
                while(!checkFileName(a)){
                    window.alert("File name should not be grater than 10 char and should not contain a numnber");
                    a = window.prompt("Please try again!");
                }
                item.name = a;
                console.log(childCount);
                let requiredElem;
                if(childCount === 3){
                    requiredElem = elem.firstElementChild
                }else{
                    requiredElem = elem.firstElementChild.nextElementSibling
                }
                console.log(requiredElem)
                requiredElem.innerHTML = a;
            }
            checkFileName("");
        }
        if (item.type == "folder") {
            answer = renameItem(item.children, index);
        }
    }
}





