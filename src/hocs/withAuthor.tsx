import { currentUserState } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface WithAuthorizationProps {
  hotelName: string;
}

export function WithAuthorization({
  children,
  hotelName,
}: React.PropsWithChildren<WithAuthorizationProps>): JSX.Element {
  const navigate = useNavigate();
  const [currentUser] = useRecoilState(currentUserState);

  // if (
  //   currentUser?.role === RoleAdmin.MANAGE &&
  //   currentUser.hotelId !== hotelId
  // ) {
  //   navigate("/");
  //   return <></>;
  // }

  return <>{children}</>;
}
