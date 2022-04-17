import { isObject } from './object';

export const merge = (target, ...sources) => {
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();

    if (Array.isArray(target) && Array.isArray(source)) {
        target.forEach((item, index) => {
            if (source[index]) {
                if (typeof source[index] !== typeof item) {
                    target[index] = source[index];
                }
                merge(item, source[index]);
            }
        });

        for (let i = target.length; i < source.length; i++) {
            target[i] = source[i];
        }
    }

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key]) || Array.isArray(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: isObject(source[key]) ? {} : [] });
                }
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
};

export default merge;
