import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes'

export default [
  route('chat', 'routes/chat.tsx'),
  index('routes/home.tsx'),

  layout('routes/auth/_layout.tsx', [
    route('auth/login', 'routes/auth/login.tsx'),
    route('auth/register', 'routes/auth/register.tsx'),
  ]),

  layout('routes/dashboard/_layout.tsx', [
    route('dashboard', 'routes/dashboard/index.tsx'),
    route('dashboard/orders', 'routes/dashboard/kitchen.tsx'),
    route('dashboard/menu', 'routes/dashboard/menu.tsx'),
  ]),
] satisfies RouteConfig
