(function(){
    //delete String.prototype['trimStart'];
    let strProp:any=Object.getPrototypeOf('');
    delete strProp['trimEnd'];
    
})();