import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const SingleLevel = ({ item, drawerOpen }) => {
  const navigate = useNavigate();
  const isActive = global.location.pathname === item.url;

  const onClick = React.useCallback(
    () =>
      item.url && navigate(item.url, { replace: isActive }),
    [isActive, item.url, navigate]
  );

  return (
    <Box
      aria-haspopup='true'
      sx={{
        minHeight: 48,
        bgcolor: item.isActive?.()
          ? "rgba(84, 83, 83, 0.3)"
          : "",
        backgroundClip: "content-box",
        "&:hover": {
          bgcolor: item.isActive?.()
            ? "rgba(84, 83, 83, 0.7)"
            : "#556EE6",
          color: "white",
        },
        width: "100%",
        display: "flex",
        gap: 2,
        alignItems: "center",
        cursor: "pointer",
        justifyContent: !item.isShowDrawerTitle
          ? "center"
          : "initial",
        p: 0,
      }}
    >
      <div
        className='flex items-center gap-x-2 px-3 '
        onClick={onClick}
      >
        <div
          className={`flex items-center   ${item.isActive?.() ? "menu-icon-active" : ""
            } ${item.isActive?.()
              ? "text-[#556EE6]"
              : "text-[#C8C7C7]"
            } ${drawerOpen ? "m-1" : "m-auto"}`}
        >
          {item.icon}
        </div>

        {item.isShowDrawerTitle && (
          <span className=' text-lg'>{item.title}</span>
        )}
      </div>
    </Box>
  );
};

function MenuDropdown({ item, drawerOpen }) {
  return (
    <SingleLevel item={item} drawerOpen={drawerOpen} />
  );
}

export default MenuDropdown;
