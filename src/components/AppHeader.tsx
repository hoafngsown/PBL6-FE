import { postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import { currentUserState, LOGIN_PATH } from "@/constants";
import { removeToken } from "@/utils";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const drawerWidth = 245;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface AppHeaderProps {
  open?: boolean;
  drawerWidth: number;
  handleDrawerClose: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: "64px",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...{
    marginLeft: open ? drawerWidth : "65px",
    width: `calc(100% - ${open ? drawerWidth : "65"}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function AppHeader(props: AppHeaderProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  const [currentAdmin] = useRecoilState(currentUserState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerLogout = async () => {
    await postApi(API_PATH.LOGOUT, {}, {});
    handleClose();
    removeToken();
    navigate(LOGIN_PATH);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#FFFFFF" }} open={props.open}>
        <Toolbar
          className={`${props.open ? "justify-between" : "justify-end"}`}
        // className={"justify-end"}
        >
          {props.open && (
            <IconButton
              sx={{ color: "#0F172A" }}
              onClick={props.handleDrawerClose}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className="ml-auto">
            <button
              id="userDropdown"
              aria-controls={openDropdown ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openDropdown ? "true" : undefined}
              onClick={handleClick}
            >
              <div className="flex">
                <div className="w-[32px] h-[32px] rounded-full bg-[#556EE6] flex justify-center items-center">
                  <img src="/images/icons/user.svg" alt="" />
                </div>
                <span className="text-[#0B0E1F] ml-[0.5rem] mt-[0.4rem]">
                  {currentAdmin?.userName}
                </span>
                {openDropdown ? (
                  <ExpandLessSharpIcon className="text-[#0B0E1F] mt-[0.4rem]" />
                ) : (
                  <ExpandMoreIcon className="text-[#0B0E1F] mt-[0.4rem]" />
                )}
              </div>
            </button>
            <Menu
              sx={{ "& ul": { paddingBottom: 0 } }}
              id="userDropdown"
              anchorEl={anchorEl}
              open={openDropdown}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{ border: "1px solid #ccc", borderRadius: "3px" }}
                onClick={handlerLogout}
              >
                <ListItemIcon className="!min-w-[25px]">
                  <LogoutIcon
                    sx={{
                      color: "#000",
                    }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
}
