import _ from 'lodash';

function isArray (obj: any)  {
    return _.isArray(obj)
}

function includes (mainArray: any, subArray: any)  {
    return subArray.every((subObj: any) =>
        mainArray.some((mainObj: any) => _.isEqual(mainObj, subObj))
    );
}

export default { isArray, includes }