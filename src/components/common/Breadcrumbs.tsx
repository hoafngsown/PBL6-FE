import { Route } from "@/types";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { COLORS } from "@/constants";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

interface MyBreadcrumbsProps {
  routes: Route[];
}

function MyBreadcrumbs(props: MyBreadcrumbsProps) {
  const routes = props.routes;
  const navigate = useNavigate();
  if (!routes || routes.length === 0) return <></>;

  const handlerNavigate = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        ".MuiBreadcrumbs-separator": {
          margin: 0,
        },
      }}
    >
      {routes.map((route: Route, index: number) => (
        <Link
          key={index}
          underline={index === routes.length - 1 ? "none" : "hover"}
          onClick={() => handlerNavigate(route.href)}
          sx={{
            padding: "0px 8px",
            textTransform: "capitalize",
            cursor: index === routes.length - 1 ? "default" : "pointer",
            color:
              index === routes.length - 1 ? COLORS.active : COLORS.textPrimary,
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          {route.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default MyBreadcrumbs;
