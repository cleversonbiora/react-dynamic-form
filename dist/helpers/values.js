export function getVariables(value) {
    var variables = [],
        regex = /{([^}]+)}/g,
        val = `${value}`,
        match;

    while (match = regex.exec(val)) {
        variables.push(match[1]);
    }
    return variables;
}

export function isVariable(value) {
    var val = `${value}`;
    if (val.startsWith('{') && val.endsWith('}')) return true;
    return false;
}

export function getVariableString(value) {
    var val = `${value}`;
    return val.substring(1, val.length - 1);
}