/// <reference path="Number.d.ts" />

if(!Number.prototype.isBetween){
    Number.prototype.isBetween = function (val1, val2) {
        if(isNaN(val1)||isNaN(val2)) return false;
        return (val1-this)*(val2-this)<=0;
    }
}

