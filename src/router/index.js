import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 
 * *注:子菜单只出现在路由子菜单。长度> = 1

*详情见:https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html

*

* hidden: true如果设置为true，项目将不会显示在侧边栏(默认为false)

* alwaysShow: true如果设置为true，将始终显示根菜单

*如果没有设置alwaysShow，当item有多个子路由时，

*它将成为嵌套模式，否则不显示根菜单

* redirect: noRedirect如果设置了noRedirect，则不会在面包屑中重定向

* name:'router-name'这个名字被使用(必须设置!!)

* meta: {

角色:['admin'，'editor']控制页面角色(您可以设置多个角色)

标题:“Title”的名称显示在侧边栏和面包屑(建议设置)

图标:'svg-name'/'el-icon-x'图标显示在侧边栏

面包屑:false如果设置为false，该项目将隐藏在面包屑中(默认为true)

activeMenu: '/example/list'如果设置了path，侧边栏会突出显示你设置的路径

｝

* constantRoutes

没有权限要求的基本页面

*所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "仪表盘", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "示例", icon: "el-icon-s-help" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "表格", icon: "table" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "树型", icon: "tree" },
      },
    ],
  },
  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "嵌套",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "menu2" },
      },
      {
        path: "corn1",
        component: () => import("@/views/nested/corn/corn1"),
        name: "Corn1",
        meta: { title: "corn表达式" },
      },
      {
        path: "corn2",
        component: () => import("@/views/nested/corn/corn2"),
        name: "Corn2",
        meta: { title: "corn表达式" },
      },
    ],
  },
  {
    path: "/demo",
    component: Layout,
    redirect: "/demo/Home",
    name: "Demo",
    meta: {
      title: "演示",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "Home",
        name: "Home",
        component: () => import("@/views/demo/Home"),
        meta: { title: "首页", icon: "table" },
      },
      // {
      //   path: 'fmap2',
      //   name: 'Fmap2',
      //   component: () => import('@/views/demo/fmap2/fmap2'),
      //   meta: { title: 'fmap2', icon: 'table'}
      // },
      // {
      //   path: 'fmap3',
      //   name: 'Fmap3',
      //   component: () => import('@/views/demo/fmap3'),
      //   meta: { title: 'fmap3', icon: 'table'}
      // },
      // {
      //   path: 'fmap4',
      //   name: 'Fmap4',
      //   component: () => import('@/views/demo/fmap4'),
      //   meta: { title: 'fmap4', icon: 'table'}
      // },
      // {
      //   path: 'fmap5',
      //   name: 'Fmap5',
      //   component: () => import('@/views/demo/fmap5/fmap5'),
      //   meta: { title: 'fmap5', icon: 'table'}
      // },
      // {
      //   path: 'fmap6',
      //   name: 'Fmap6',
      //   component: () => import('@/views/demo/fmap5/fmap6'),
      //   meta: { title: 'fmap6', icon: 'table'}
      // },
      {
        path: "leaflet",
        name: "Leaflet",
        component: () => import("@/views/demo/leaflet"),
        meta: { title: "leaflet", icon: "table" },
      },
      {
        path: "leafletBD",
        name: "LeafletBD",
        component: () => import("@/views/demo/leafletBD"),
        meta: { title: "leafletBD", icon: "table" },
      },
      {
        path: "leafletB",
        name: "LeafletB",
        component: () => import("@/views/demo/leafletB"),
        meta: { title: "leafletB", icon: "table" },
      },
      {
        path: "leafletC",
        name: "LeafletC",
        component: () => import("@/views/demo/leafletC"),
        meta: { title: "leafletC", icon: "table" },
      },
      {
        path: 'leafletCanvas',
        name: 'LeafletCanvas',
        component: () => import('@/views/demo/leafletCanvas'),
        meta: { title: 'leafletCanvas', icon: 'table' }
      },
      {
        path: 'leafletCanvas2',
        name: 'LeafletCanvas2',
        component: () => import('@/views/demo/leafletCanvas2'),
        meta: { title: 'leafletCanvas2', icon: 'table' }
      },
      // {
      //   path: 'baidu1',
      //   name: 'Baidu1',
      //   component: () => import('@/views/demo/baidu1'),
      //   meta: { title: '百度点聚合', icon: 'table'}
      // },
      // {
      //   path: 'baidu2',
      //   name: 'Baidu2',
      //   component: () => import('@/views/demo/baidu2'),
      //   meta: { title: '百度批量坐标点', icon: 'table'}
      // },
      {
        path: 'bdLuShu',
        name: 'BdLuShu',
        component: () => import('@/views/demo/bdLuShu'),
        meta: { title: '百度路书', icon: 'table' }
      },
      // {
      //   path: 'baiduMapV',
      //   name: 'BaiduMapV',
      //   component: () => import('@/views/demo/baiduMapV'),
      //   meta: { title: '百度MapV点聚合', icon: 'table'}
      // },      
      // {
      //   path: 'chart',
      //   name: 'Chart',
      //   component: () => import('@/views/demo/chart'),
      //   meta: { title: 'chartJs', icon: 'table'}
      // },
      // {
      //   path: "dragDialog",
      //   name: "DragDialog",
      //   component: () => import("@/views/demo/dragDialog"),
      //   meta: { title: "拖拽对话框", icon: "table" },
      // },      
      {
        path: "transfer",
        name: "Transfer",
        component: () => import("@/views/demo/transfer"),
        meta: { title: "表格穿梭框" },
        children: [
          {
            path: 'transferA',
            name: 'TransferA',
            component: () => import('@/views/demo/transfer/transferA'),
            meta: { title: '穿梭框C', icon: 'table' }
          },
        ]
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/demo/test'),
        meta: { title: '测试', icon: 'table' }
      },
      {
        path: "fullScreen",
        name: "FullScreen",
        component: () => import("@/views/demo/fullScreen"),
        meta: { title: "全屏视频" },
        children: [
          {
            path: 'fullScreenA',
            name: 'fullScreenA',
            component: () => import('@/views/demo/fullScreen/fullScreenA'),
            meta: { title: '全屏视频', icon: 'table' }
          },
          {
            path: 'flv-extend',
            name: 'Flv-extend',
            component: () => import('@/views/demo/fullScreen/flv-extend'),
            meta: { title: 'flv-extend', icon: 'table' }
          },
          {
            path: 'tcplayer',
            name: 'Tcplayer',
            component: () => import('@/views/demo/fullScreen/tcplayer'),
            meta: { title: '腾讯web播放器', icon: 'table' }
          },
          {
            path: 'liveplayer',
            name: 'Liveplayer',
            component: () => import('@/views/demo/fullScreen/liveplayer'),
            meta: { title: 'live播放器', icon: 'table' }
          },
          {
            path: 'xgplayer',
            name: 'Xgplayer',
            component: () => import('@/views/demo/fullScreen/xgplayer'),
            meta: { title: '西瓜播放器', icon: 'table' }
          },
          {
            path: 'artplayer',
            name: 'Artplayer',
            component: () => import('@/views/demo/fullScreen/artplayer'),
            meta: { title: 'art播放器', icon: 'table' }
          },
        ]
      },
      {
        path: "roaster",
        name: "Roaster",
        component: () => import("@/views/demo/roaster"),
        meta: { title: "排版表" },
        children: [
          {
            path: 'roasterA',
            name: 'RoasterA',
            component: () => import('@/views/demo/roaster/roasterA'),
            meta: { title: '表1', icon: 'table' }
          },
          {
            path: 'gantt',
            name: 'Gantt',
            component: () => import('@/views/demo/roaster/gantt'),
            meta: { title: '甘特图', icon: 'table' }
          },
        ]
      },
      {
        path: "chat",
        name: "Chat",
        component: () => import("@/views/demo/chat"),
        meta: { title: "通信" },
        children: [
          {
            path: 'websocket',
            name: 'Websoclet',
            component: () => import('@/views/demo/chat/websocket'),
            meta: { title: 'websocket', icon: 'table' }
          },
          {
            path: 'mqtt',
            name: 'Mqtt',
            component: () => import('@/views/demo/chat/mqtt'),
            meta: { title: 'mqtt', icon: 'table' }
          },
        ]
      },
      {
        path: "dragBox",
        name: "DragBox",
        component: () => import("@/views/demo/dragBox"),
        meta: { title: "拖拽盒子" },
        children: [
          {
            path: 'dragBoxA',
            name: 'DragBoxA',
            component: () => import('@/views/demo/dragBox/dragBoxA'),
            meta: { title: '拖拽盒子A', icon: 'table' }
          },
          {
            path: 'dragBoxB',
            name: 'DragBoxB',
            component: () => import('@/views/demo/dragBox/dragBoxB'),
            meta: { title: '拖拽盒子组件', icon: 'table' }
          },
          {
            path: 'dragBoxC',
            name: 'DragBoxC',
            component: () => import('@/views/demo/dragBox/dragBoxC'),
            meta: { title: '拖拽盒子组件B', icon: 'table' }
          },
        ]
      },
    ],
  },
  // {
  //   path: '/3D',
  //   component: Layout,
  //   redirect: '/3D/threeJs',
  //   name: '3D',
  //   meta: {
  //     title: '3D模型',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'threeJs',
  //       name: 'ThreeJs',
  //       component: () => import('@/views/3D/threeJs'),
  //       meta: { title: 'threeJs' }
  //     },
  //     {
  //       path: 'threeSkull',
  //       name: 'ThreeSkull',
  //       component: () => import('@/views/3D/threeSkull'),
  //       meta: { title: 'threeSkull' }
  //     },
  //     {
  //       path: 'cesium1',
  //       name: 'Cesium1',
  //       component: () => import('@/views/3D/cesium1'),
  //       meta: { title: 'cesium1' }
  //     },
  //     {
  //       path: 'cesium2',
  //       name: 'Cesium2',
  //       component: () => import('@/views/3D/cesium2'),
  //       meta: { title: 'cesium2' }
  //     },
  //     {
  //       path: 'cesium3',
  //       name: 'Cesium3',
  //       component: () => import('@/views/3D/cesium3'),
  //       meta: { title: 'cesium3' }
  //     },
  //     {
  //       path: 'cesium4',
  //       name: 'Cesium4',
  //       component: () => import('@/views/3D/cesium4'),
  //       meta: { title: 'cesium4' }
  //     },
  //     {
  //       path: 'cesium_draw',
  //       name: 'Cesium_draw',
  //       component: () => import('@/views/3D/cesium_draw'),
  //       meta: { title: 'cesium_draw' }
  //     },
  //     {
  //       path: 'three',
  //       name: 'Three',
  //       component: () => import('@/views/3D/three'),
  //       meta: { title: 'three' }
  //     }
  //   ]
  // },
  {
    path: "/fy-demo",
    component: Layout,
    redirect: "/fy-demo/manvon-editor",
    name: "FyDemo",
    meta: {
      title: "FyDemo",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "manvon-editor",
        name: "ManvonEditor",
        component: () => import("@/views/fy-demo/manvon-editor"),
        meta: { title: "ManvonEditor", icon: "table" },
      },
      {
        path: "danmu",
        name: "DanMu",
        component: () => import("@/views/fy-demo/danmu"),
        meta: { title: "弹幕组件", icon: "table" },
      },
    ],
  },
  {
    path: "/zhangyu",
    component: Layout,
    redirect: "/zhangyu/dashboard",
    name: "Zhangyu",
    meta: {
      title: "章鱼",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/zhangyu/dashboard"),
        meta: { title: "首页" },
      },
      {
        path: "house",
        name: "House",
        component: () => import("@/views/zhangyu/house"),
        meta: { title: "房源管理" },
        children: [
          {
            path: "list",
            name: "List",
            component: () => import("@/views/zhangyu/house/list"),
            meta: { title: "房源列表" },
          },
          {
            path: "create",
            name: "Create",
            component: () => import("@/views/zhangyu/house/create"),
            meta: { title: "房源创建" },
          },
          {
            path: "edit",
            name: "Edit",
            component: () => import("@/views/zhangyu/house/edit"),
            meta: { title: "房源编辑" },
          },
        ],
      },
    ],
  },
  {
    path: "/elTable",
    component: Layout,
    redirect: "/elTable/table1",
    name: "ElTable",
    meta: { title: "动态表格", icon: "el-icon-s-help" },
    children: [
      {
        path: "table1",
        name: "Table1",
        component: () => import("@/views/elTable/table1"),
        meta: { title: "表格1" },
      },
      {
        path: "table2",
        name: "Table2",
        component: () => import("@/views/elTable/table2"),
        meta: { title: "表格2" },
      },
      {
        path: "table3",
        name: "Table3",
        component: () => import("@/views/elTable/table3"),
        meta: { title: "表格3" },
      },
      {
        path: "table4",
        name: "Table4",
        component: () => import("@/views/elTable/table4"),
        meta: { title: "自定义表头" },
      },
      {
        path: "dynamic-table",
        name: "Dynamic",
        component: () => import("@/views/elTable/dynamic-table"),
        meta: { title: "动态表" },
      },
      {
        path: "table5",
        name: "Table5",
        component: () => import("@/views/elTable/table5"),
        meta: { title: "循环表头" },
      },
      {
        path: "db6",
        name: "Db6",
        component: () => import("@/views/elTable/db6"),
        meta: { title: "双击表单编辑" },
      },
      {
        path: "db7",
        name: "Db7",
        component: () => import("@/views/elTable/db7"),
        meta: { title: "拖拽list" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/elTable/tree"),
        meta: { title: "树型结构" },
      },
      {
        path: 'treePopover',
        name: 'TreePopover',
        component: () => import('@/views/elTable/treePopover'),
        meta: { title: '树型弹出框' }
      },
      {
        path: 'treePopoverB',
        name: 'TreePopoverB',
        component: () => import('@/views/elTable/treePopoverB'),
        meta: { title: '树型弹出框B' }
      },
      {
        path: 'keyUpTable',
        name: 'KeyUpTable',
        component: () => import('@/views/elTable/keyUpTable'),
        meta: { title: '键盘控制' }
      },
      {
        path: 'keyUpTableB',
        name: 'KeyUpTableB',
        component: () => import('@/views/elTable/keyUpTableB'),
        meta: { title: '键盘控制B' }
      },
    ]
  },
  {
    path: "/richText",
    component: Layout,
    redirect: "/richText/text1",
    name: "RichText",
    meta: { title: "富文本", icon: "el-icon-s-help" },
    children: [
      {
        path: "text1",
        name: "Text1",
        component: () => import("@/views/richText/text1"),
        meta: { title: "vue2-editor" },
      },
      {
        path: "text2",
        name: "Text2",
        component: () => import("@/views/richText/text2"),
        meta: { title: "vue-quill-editor" },
      },
      {
        path: "text3",
        name: "Text3",
        component: () => import("@/views/richText/text3"),
        meta: { title: "tinyMce" },
      },
    ],
  },
  {
    path: "/excel",
    component: Layout,
    redirect: "/excel/exc1",
    name: "Excel",
    meta: { title: "导入表格", icon: "el-icon-s-help" },
    children: [
      {
        path: "exc1",
        name: "Exc1",
        component: () => import("@/views/excel/exc1"),
        meta: { title: "导入导出表格" },
      },
      {
        path: "upload-excel",
        name: "Upload-excel",
        component: () => import("@/views/excel/upload-excel"),
        meta: { title: "导入表格" },
      },
      {
        path: "exportTable",
        name: "ExportTable",
        component: () => import("@/views/excel/exportTable"),
        meta: { title: "导出表格" },
      },
    ],
  },
  {
    path: "/canvas",
    component: Layout,
    redirect: "/canvas/can1",
    name: "Canvas",
    meta: { title: "画布", icon: "el-icon-s-help" },
    children: [
      {
        path: "can1",
        name: "Can1",
        component: () => import("@/views/canvas/can1"),
        meta: { title: "签名" },
      },
      {
        path: "can2",
        name: "Can2",
        component: () => import("@/views/canvas/can2"),
        meta: { title: "签名" },
      },
      {
        path: "can3",
        name: "Can3",
        component: () => import("@/views/canvas/can3"),
        meta: { title: "签名" },
      },
      {
        path: "can4",
        name: "Can4",
        component: () => import("@/views/canvas/can4"),
        meta: { title: "签名" },
      },
      {
        path: "can5",
        name: "Can5",
        component: () => import("@/views/canvas/can5"),
        meta: { title: "vue-esign签名" },
      },
      {
        path: "signature_pad",
        name: "Signature_pad",
        component: () => import("@/views/canvas/signature_pad"),
        meta: { title: "signature_pad签名" },
      },
      {
        path: "superFlow",
        name: "SuperFlow",
        component: () => import("@/views/canvas/superFlow"),
        meta: { title: "流程图" },
      },
    ],
  },

  // 404 page must be placed at the end  404页面必须放置在最后!!!
  // { path: '*', redirect: '/404', hidden: true }
];

export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/directive",
    alwaysShow: true, // will always show the root menu 总是显示根菜单
    name: "Permission",
    meta: {
      title: "许可",
      icon: "link",
      roles: ["admin"], // you can set roles in root nav 可以在根导航中设置角色
    },
    children: [
      {
        path: "directive",
        component: () => import("@/views/permission/directive"),
        name: "Directive",
        meta: {
          title: "权限指令",
          roles: ["admin"], // or you can only set roles in sub nav 或者只能在子导航中设置角色
        },
      },
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "Page",
        meta: {
          title: "权限页",
          roles: ["admin"], // or you can only set roles in sub nav 或者只能在子导航中设置角色
        },
      },
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "Role",
        meta: {
          title: "权限角色",
          roles: ["admin"],
          // if do not set roles, means: this page does not require permission 如果不设置角色，则表示:此页面不需要权限
        },
      },
      // {
      //   path: 'components/SwitchRoles',
      //   component: () => import('@/views/permission/components/SwitchRoles'),
      //   name: 'SwitchRoles',
      //   meta: {
      //     title: 'Permission SwitchRoles'
      //     // if do not set roles, means: this page does not require permission
      //   }
      // }
    ],
  },
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "链接", icon: "link", roles: ["admin"] },
      },
    ],
  },
  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "表单", icon: "form", roles: ["admin"] },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
