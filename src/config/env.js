/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';


//返回当前环境的环境变量

if (process.env.NODE_ENV == 'development') {  
	 baseUrl = ""
}else if(process.env.NODE_ENV == 'production'){
	 baseUrl = 'http://uic.umu360.com/api/'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}