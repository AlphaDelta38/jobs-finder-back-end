export function checkUserObjFields(user, keys){
    for (const key of keys) {
        if (!user[key]) {
            return `${key} field is required`;
        }
    }
    return null;
}
