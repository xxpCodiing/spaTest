
/*后端交互的js*/

import fetch from '../config/fetch'
import axios from '../config/axiosRequest'

/**
 * 获取母猪种类列表
 */
export const getSowTypeList = () => fetch('pigrecord/ListPigVariety.json');
export const getSOwTypeList_new = ()=>axios('pigrecord/ListPigVariety.json');
export const getSOwTypeListx = (succ,fail)=>axios('pigrecord/ListPigVariety.json',{},'get',{timeout:500});

/**
 * 获取配置信息   envData
 */
export const getEnvData = () => axios('uic/get-env-data.json');