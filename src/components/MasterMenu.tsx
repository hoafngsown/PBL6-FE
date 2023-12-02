import { MENU } from "@/constants/menu";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuDropdown from "./MenuDropdown";

export function hasChildren(item) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

const MenuItem = ({ item, drawerOpen }) => {
  return <SingleLevel item={item} drawerOpen={drawerOpen} />;
};

const SingleLevel = ({ item, drawerOpen }) => {
  const navigate = useNavigate();
  const isActive = global.location.pathname === item.url;

  const onClick = React.useCallback(
    () => item.url && navigate(item.url, { replace: isActive }),
    [isActive, item.url, navigate]
  );

  return (
    <ListItem button onClick={onClick} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: drawerOpen ? "initial" : "center",
          p: 0,
          mx: 2,
          my: 1,
          bgcolor: item.isActive?.() ? "rgba(84, 83, 83, 0.3)" : "",
          backgroundClip: "content-box",
          "&:hover": {
            bgcolor: "rgba(84, 83, 83, 0.3)",
          },
        }}
      >
        <ListItemIcon
          className={`${item.isActive?.() ? "menu-icon-active" : ""}`}
          sx={{
            minWidth: 21,
            margin: drawerOpen ? 1 : "auto",
            justifyContent: "center",
            color: item.isActive?.() ? "#556EE6" : "#C8C7C7",
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: item.isActive?.() ? "#556EE6" : "#C8C7C7",
          }}
          primary={item.title}
          sx={{ opacity: drawerOpen ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  )
};

const StyledMasterMenu = styled.div`
  // .MuiListItemIcon-root,
  // .MuiTypography-root {
  //   color: white;
  // }
  // .MuiListItemIcon-root {
  //   min-width: 36px;
  // }
  // .MuiCollapse-root {
  //   padding-top: 5px;
  // }
  .MuiButtonBase-root {
    border-radius: 10px;

    &.child {
      width: calc(100% - 40px);
      margin-left: 40px;
    }
    &.actived {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

interface IMasterMenuProps {
  drawerOpen: boolean;
}

export const MasterMenu = (
  props: React.PropsWithChildren<IMasterMenuProps>
) => {

  return (
    <StyledMasterMenu>
      {MENU.map((item, key) =>
        props.drawerOpen ? (
          <MenuItem key={key} item={item} drawerOpen={props.drawerOpen} />
        ) : (
          <MenuDropdown key={key} item={item} drawerOpen={props.drawerOpen} />
        )
      )}
    </StyledMasterMenu>
  );
};
