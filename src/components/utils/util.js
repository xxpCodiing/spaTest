
import {fix} from "./commUtils"

/**
 * 获取当日日期
 */
export const getCurrentDate = () => {
    var date = new Date();
    var year = date.getFullYear(); 
    var month = date.getMonth()+1; 
    var day = date.getDate();     
    return year+"-"+fix(month , 2) +"-"+ fix(day , 2);
}

//日期加减天数
export const minusDate = (dd,days) =>{
     var a = new Date(dd);
     a = a.valueOf();
     a = a - days * 24 * 60 * 60 * 1000;
     a = new Date(a);
     return a.getFullYear() + "-" + fix(parseInt(a.getMonth() + 1), 2) + "-" + fix(a.getDate(), 2);
}