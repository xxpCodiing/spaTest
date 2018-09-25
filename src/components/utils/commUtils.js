
/****************************************************************公用util***********************************************************/



export const fix = (num, length) => {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}