(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/askItem/askItem"],{"3a32":function(e,t,n){"use strict";var o=n("7bf6"),r=n.n(o);r.a},6261:function(e,t,n){"use strict";n.r(t);var o=n("75a3"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},"75a3":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("a34a")),r=n("26cb");function u(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,o,r,u,i){try{var c=e[u](i),a=c.value}catch(s){return void n(s)}c.done?t(a):Promise.resolve(a).then(o,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var u=e.apply(t,n);function c(e){i(u,o,r,c,a,"next",e)}function a(e){i(u,o,r,c,a,"throw",e)}c(void 0)}))}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={data:function(){return{list:[],userMsg:[],time:"",managerMsg:{}}},computed:s({},(0,r.mapState)("login",["userInfo"])),onLoad:function(e){var t=this;return c(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$onLaunched;case 2:t.list=JSON.parse(e.list),t.list.progress.update_time?t.time=t.$moment(1e3*t.list.progress.update_time).format("YYYY-MM-DD"):t.time="暂无",t.userMsg=t.userInfo,t.$iBox.http("getProjectManager",{point_type_id:t.list.point_type_id})({method:"post"}).then((function(e){t.managerMsg=e.data})).catch((function(e){console.log("网络错误",e)}));case 6:case"end":return n.stop()}}),n)})))()},methods:{takePhone:function(){e.makePhoneCall({phoneNumber:this.userMsg.phone})},submit:function(){0==this.userInfo.grade?e.showModal({tittle:"提示",content:"您尚未完善信息,请先完善信息!",showCancel:!1,success:function(){e.navigateTo({url:"../msgInfo/msgInfo"})}}):this.$iBox.http("addProjectUser",{project_id:this.list.id})({method:"post"}).then((function(t){0==t.code&&e.showModal({title:"提交申请成功",content:"请等待部门领导审核",showCancel:!1,success:function(e){}})})).catch((function(e){console.log("网络错误",e)}))}},onShareAppMessage:function(e){var t=getCurrentPages(),n=t[t.length-1],o=n.route;return{path:o+"?list="+JSON.stringify(this.list)}}};t.default=l}).call(this,n("543d")["default"])},"7bf6":function(e,t,n){},b25c:function(e,t,n){"use strict";n.r(t);var o=n("faa1"),r=n("6261");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("3a32");var i,c=n("f0c5"),a=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"7bf88ff4",null,!1,o["a"],i);t["default"]=a.exports},dea9:function(e,t,n){"use strict";(function(e){n("a2f3");o(n("66fd"));var t=o(n("b25c"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},faa1:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"19b9"))},uLine:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-line/u-line")]).then(n.bind(null,"8e0b"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"e1bd"))}},r=function(){var e=this,t=e.$createElement;e._self._c},u=[]}},[["dea9","common/runtime","common/vendor"]]]);