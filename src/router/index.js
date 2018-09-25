
//路由

/*import Hello from "../components/Hello"
import About from "../components/About"


export default [
    {path :"/",component:Hello},
    {path: "/about",component:About}
] */


export default [
    //{path :"/",component: r => require.ensure([], () => r(require('../components/Hello')), 'hello')},
    {path: "/",component: r => require.ensure([], () => r(require('../components/welcome')), 'welcome'),meta:{title:'欢迎'}},
    {path: "/about",component: r => require.ensure([], () => r(require('../components/About')), 'about'),meta:{title:'欢迎1'}},
    {path: "/Hello",component: r => require.ensure([], () => r(require('../components/Hello')), 'Hello'),meta:{title:'欢迎1'}},
    {path: "/sowpig",component: r => require.ensure([], () => r(require('../components/sowpig')), 'sowpig'),meta:{title:'欢迎1'}},
    {path: "/reversePig",component: r => require.ensure([], () => r(require('../components/pages/reversePig')), 'reversePig'),meta:{title:'欢迎1'}},
   
]