export function getValidation(validation,value){
    switch(validation.type){
        case "minLength":
            return minLength(validation.rule,value);
        default:
            return () => {return true;};
    }
}

export function minLength(rule,value){
    var val = `${value}`;
    if(val.length < rule){
        return false;
    }
    return true;
}