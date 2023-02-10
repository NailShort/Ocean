
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
      },
      {
        path: 'products/:id',
        name: 'products',
        component: () => import('pages/front/ProductPage.vue'),
        meta: {
          title: 'Ocean | 商品',
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
  {
    path: '/member',
    component: () => import('layouts/MemberLayout.vue'),
    children: [
      {
        path: '',
        name: 'member-home',
        component: () => import('pages/member/HomePage.vue'),
        meta: {
          title: 'Ocean | 會員專區',
          login: true,
          admin: false
        }
      },
      {
        path: 'mine',
        name: 'member-mine',
        component: () => import('pages/member/MinePage.vue'),
        meta: {
          title: 'Ocean | 我的文章',
          login: true,
          admin: false
        }
      },
      {
        path: 'like',
        name: 'member-like',
        component: () => import('pages/member/LikePage.vue'),
        meta: {
          title: 'Ocean | 最愛文章',
          login: true,
          admin: false
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
