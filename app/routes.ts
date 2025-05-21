import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  route('chat', 'routes/chat.tsx'),
  index('routes/home.tsx'),

  layout('routes/dashboard/_layout.tsx', [
    route('dashboard/kitchen', 'routes/dashboard/kitchen.tsx'),
    route('dashboard/menu', 'routes/dashboard/menu.tsx'),
  ]),
] satisfies RouteConfig
