export function filter2DArray(array: any[], prop: any, value: any) {
    let filtered = [];

    for (let row in array) {
        let obj = array[row];

        for (let key in obj) {
            if (typeof(obj[key] === "object")) {
                let item = obj[key];

                if(item[prop] === value){
                    filtered.push(item);
                }
            }
        }
    }    

    return filtered;
}