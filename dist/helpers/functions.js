import { isVariable, getVariableString } from "./values";

export function execFunc(func, values) {
    // eslint-disable-next-line
    var jsonFunc = new Function(func.args, func.body);
    var params = func.params.map(val => isVariable(val) ? values[getVariableString(val)] : val);
    return jsonFunc(...params);
}