import React from "react";
import styled from "styled-components";

import { currentUserState } from "@/constants";
import { LoginForm } from "@/pages/auth/components/login";
import { saveTokenToCookies, saveTokenToSession } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { RoleAdmin } from "@/enums";
// import { LIST_HOTEL } from "@/constants/hotel";

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/images/bg-login.svg");
  background-size: cover;
  .page-content {
    width: 524px;
    height: 606px;
  }
  .card {
    display: flex;
    justify-content: center;
    padding: 36px 48px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(77, 70, 70, 0.2);
  }
`;

interface ILoginPageProps {}

export const LoginPage = (props: React.PropsWithChildren<ILoginPageProps>) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  // const handleLoginSuccess = (result: any, saveToken: boolean) => {
  //   if (saveToken) {
  //     saveTokenToCookies(result.tokens.accessToken);
  //   } else {
  //     saveTokenToSession(result.tokens.accessToken);
  //   }

  //   setCurrentUser(result.user);
  // };

  const handleLoginSuccess = (result: any, saveToken: boolean) => {
    navigate("/");
  };

  return (
    <StyledLoginPage>
      <div className="page-content">
        <div className="card !py-[3.5rem]">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </StyledLoginPage>
  );
};
