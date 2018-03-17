var koa = require('koa');
var app = koa();
var router = require('koa-router');
const permissionMap = objToStrMap({
  "READ_INVENTORY_DASHBOARD": "商品统计查看",
  "READ_CONNECTION_DASHBOARD": "供应商统计查看",
  "MANAGE_DEPARTMENT": "部门管理",
  "MANAGE_USER": "员工管理"
})
const permissionTypeMap = objToStrMap({
    "DASHBOARD": "统计面板权限",
    "USER": "员工权限管理"})
var parameter = objToStrMap({
    "DASHBOARD": {
      "PERMISSIONS": [
        "READ_INVENTORY_DASHBOARD",
        "READ_CONNECTION_DASHBOARD"
      ]
    },
    "USER": {
      "PERMISSIONS": [
        "MANAGE_DEPARTMENT",
        "MANAGE_USER"
      ]
    }
  })

app.use(router(app));
app.use(function *(){
    var path = this.path;
    this.body = mapPermissionName(parameter)
});
app.get('/detail/:id', function *(next) {
    //我是详情页面
    //:id 是路由通配规则，示例请求 /detail/123 就会进入该 generator function 逻辑

});
// router.get('/permissions',ctx=> {
// 	ctx.body = {name:123}
// })
// app.use(router.routers())
function mapPermissionName(permissions) {
	return   {
    "DASHBOARD": {
      "name": permissionTypeMap.get("DASHBOARD"),
      "permissions": [
        {
          "type": (objToStrMap((permissions.get("DASHBOARD"))).get("PERMISSIONS"))[0],
          "name": permissionMap.get("READ_INVENTORY_DASHBOARD")
        },
        {
          "type": (objToStrMap((permissions.get("DASHBOARD"))).get("PERMISSIONS"))[1],
          "name": permissionMap.get("READ_CONNECTION_DASHBOARD")
        },
      ]
    },
    "USER": {
      "name":  permissionTypeMap.get("USER"),
      "permissions": [
        {
          "type": (objToStrMap((permissions.get("USER"))).get("PERMISSIONS"))[0],
          "name": permissionMap.get("MANAGE_DEPARTMENT")
        },
        {
          "type": (objToStrMap((permissions.get("USER"))).get("PERMISSIONS"))[1],
          "name": permissionMap.get("MANAGE_USER")
        },
      ]
    }
  }
}

function objToStrMap(obj) {  
    let strMap = new Map();  
    for (let k of Object.keys(obj)) {  
        strMap.set(k, obj[k]);  
    }  
    return strMap;  
}  
app.listen(3000);