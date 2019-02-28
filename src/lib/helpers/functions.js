import { isVariable, getVariableString,mergeValues } from "./values";

export function execFunc(func, values){
    let mergedValues = mergeValues(values);
    // eslint-disable-next-line
    var jsonFunc = new Function(func.args, func.body);
    var params = func.params.map(val => isVariable(val) ? mergedValues[getVariableString(val)] : val);
    return jsonFunc(...params);
}