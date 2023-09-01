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
        let a = document.getElementsByClassName("sub-icon")
        for(let i=0 ; i<a.length; i++){
            a[i].style.display = "none"
        }
        alert("File name should be less than 10 char & it should not contain number!!")
    }
}