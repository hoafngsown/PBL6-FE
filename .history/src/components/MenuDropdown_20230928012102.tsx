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
          className={`flex items-center   ${
            item.isActive?.() ? "menu-icon-active" : ""
          } ${
            item.isActive?.()
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

// const MultiLevel = ({ item, drawerOpen }) => {
//   const { items: children } = item;
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   function handleMouseOver(event) {
//     if (anchorEl !== event.currentTarget) {
//       setAnchorEl(event.currentTarget);
//     }
//   }

//   function handleClose() {
//     setAnchorEl(null);
//   }
//   const isActive = global.location.pathname === item.url;

//   const onClick = () => item.url && navigate(item.url, { replace: isActive });

//   return item?.isEnable ? (
//     <Box
//       className="custom-menu"
//       sx={{
//         minHeight: 48,
//         justifyContent: drawerOpen ? "initial" : "center",
//         p: 0,
//         bgcolor: item.isActive?.()
//           ? "rgba(84, 83, 83, 0.3)"
//           : anchorEl
//           ? "#556EE6"
//           : "",
//         backgroundClip: "content-box",
//         "&:hover": {
//           bgcolor: "rgba(84, 83, 83, 0.3)",
//         },
//       }}
//     >
//       <ListItemButton
//         id={`demo-positioned-button-${item.title}`}
//         aria-controls={Boolean(anchorEl) ? "demo-positioned-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={Boolean(anchorEl) ? "true" : undefined}
//         onMouseOver={handleMouseOver}
//         onClick={onClick}
//         sx={{
//           minHeight: 48,
//           justifyContent: drawerOpen ? "initial" : "center",
//           p: 0,
//           bgcolor: item.isActive?.() ? "rgba(84, 83, 83, 0.1)" : "",
//           backgroundClip: "content-box",
//           "&:hover": {
//             bgcolor: "rgba(84, 83, 83, 0.3)",
//           },
//         }}
//       >
//         <ListItemIcon
//           className={`${item.isActive?.() ? "menu-icon-active" : ""}`}
//           sx={{
//             minWidth: 21,
//             margin: drawerOpen ? 1 : "auto",
//             justifyContent: "center",
//             color: item.isActive?.() ? "#556EE6" : "#C8C7C7",
//           }}
//         >
//           {item.icon}
//         </ListItemIcon>
//         {item.isShowDrawerTitle && (
//           <ListItemText
//             primaryTypographyProps={{
//               color: item.isActive?.() ? "white" : anchorEl ? "white" : "black",
//             }}
//             primary={item.title}
//           />
//         )}
//       </ListItemButton>
//       <Menu
//         sx={{
//           ml: 0.5,
//           paddingTop: 0,
//           paddingBottom: 0,
//         }}
//         id={`demo-positioned-button-${item.title}`}
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         MenuListProps={{ onMouseLeave: handleClose }}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         className="pt-0 pb-0 m-0"
//       >
//         <div className="rounded-md  shadow-md min-w-[250px] border-[1px] border-solid border-[#ccc]">
//           {children.map((child, key) =>
//             hasChildren(child) || child?.isEnable ? (
//               <MenuDropdown
//                 key={"MultiLevel" + key}
//                 item={child}
//                 drawerOpen={drawerOpen}
//               />
//             ) : (
//               <></>
//             )
//           )}
//         </div>
//       </Menu>
//     </Box>
//   ) : (
//     <></>
//   );
// };

function MenuDropdown({ item, drawerOpen }) {
  // const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return (
    <SingleLevel item={item} drawerOpen={drawerOpen} />
  );
  // return <Component item={item} drawerOpen={drawerOpen} />;
}

export default MenuDropdown;
