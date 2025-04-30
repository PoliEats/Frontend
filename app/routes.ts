import { type RouteConfig, index, layout, route} from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    layout("routes/auth/_layout.tsx", [
        //route("/auth/login", "routes/auth/login.tsx"),
        route("/auth/register", "routes/auth/register.tsx")
    ])
] satisfies RouteConfig;



