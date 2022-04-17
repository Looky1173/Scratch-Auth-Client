export const isObject = (target) => target && typeof target === 'object';

export const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others,
});

// copy an object without reference
export const copyObject = (obj) => {
    if (!isObject(obj)) return obj;
    if (obj instanceof Array) return [...obj];
    return { ...obj };
};

// copy an object omit some keys
export const omitObject = (obj, omitKeys) => {
    if (!isObject(obj)) return obj;
    if (obj instanceof Array) return [...obj];
    const newObj = { ...obj };
    omitKeys.forEach((key) => newObj[key] && delete newObj[key]);
    return newObj;
};
