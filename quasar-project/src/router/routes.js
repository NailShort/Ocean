
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/front/IndexPage.vue'),
        meta: {
          title: 'Ocean',
          login: false,
          admin: false
        }
      },

      {
        path: '/register',
        name: 'register',
        component: () => import('pages/front/RegisterPage.vue'),
        meta: {
          title: 'Ocean | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/front/LoginPage.vue'),
        meta: {
          title: 'Ocean | 登入',
          login: false,
          admin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin-home',
        component: () => import('pages/admin/HomePage.vue'),
        meta: {
          title: 'Ocean | 管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'article',
        name: 'admin-article',
        component: () => import('pages/admin/ArticlePage.vue'),
        meta: {
          title: 'Ocean | 文章討論管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'fish',
        name: 'admin-fish',
        component: () => import('pages/admin/FishPage.vue'),
        meta: {
          title: 'Ocean | 魚種圖鑑管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'news',
        name: 'admin-news',
        component: () => import('pages/admin/NewsPage.vue'),
        meta: {
          title: 'Ocean | 最新消息管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'member',
        name: 'admin-member',
        component: () => import('pages/admin/MemberPage.vue'),
        meta: {
          title: 'Ocean | 會員資料管理',
          login: true,
          admin: true
        }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'Ocean | 404',
      login: false,
      admin: false
    }
  }
]

export default routes
