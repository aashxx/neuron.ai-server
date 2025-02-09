export const random = (len: number) => {
    let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
    let size = options.length;
    let result = "";

    for(let i = 0; i < len; i++) {
        result += options[Math.floor(Math.random() * size)];
    }

    return result;
}