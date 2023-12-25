import React from "react";
import styled from "styled-components";

import { currentUserState } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { RoleAdmin } from "@/enums";
// import { LIST_HOTEL } from "@/constants/hotel";

import FormTextField from "@/components/form/FormTextField";
import { COLORS } from "@/constants";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button, Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";

import { postApi } from "@/api/api";
import { API_PATH } from "@/api/path";
import { signUpSchema } from '@/libs/validations/login';
import { saveTokenAndUserIdToCookies } from '@/utils';
import { NotifyTypeEnum, notify } from '@/utils/toast';
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";

const StyledLoginForm = styled.div`
  margin: 0 auto;
  width: 446px;
  display: flex;
  flex-direction: column;
  .logo {
    width: 194px;
  }
`;

interface IFormValues extends Partial<any> { }

const StyledSignUpPage = styled.div`
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

interface ISignUpPageProps { }

export const SignUpPage = (
  props: React.PropsWithChildren<ISignUpPageProps>
) => {
  const navigate = useNavigate();
  const [_, setCurrentUser] = useRecoilState(
    currentUserState
  );

  const isSubmitted = React.useRef(false);
  const [rememberPassword, setRememberPassword] =
    useState(false);

  const formik = useFormik<IFormValues>({
    initialValues: { email: "", password: "", userName: "" },
    validationSchema: signUpSchema,
    onSubmit: (values) => { mutate(values) },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (params: any) =>
      postApi(API_PATH.SIGNUP, params, ""),
    onSuccess: (res) => {
      notify('Sign up success', NotifyTypeEnum.SUCCESS);
      const result = res.data;

      setCurrentUser({ id: result.metadata.user.userID });
      saveTokenAndUserIdToCookies(result.metadata.tokens.accessToken, result.metadata.user.userID);
      navigate("/request");
    },
    onError: (err: any) => {
      notify(err.response.data.message, NotifyTypeEnum.ERROR)
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword(!showPassword);
  const handleMouseDownPassword = () =>
    setShowPassword(!showPassword);


  return (
    <StyledSignUpPage>
      <div className='page-content'>
        <div className='card !py-[3.5rem]'>
          <StyledLoginForm>
            <div>
              <h1 className='text-[2rem] text-center font-medium mb-[2.5rem]'>
                Đăng Ký
              </h1>
            </div>
            <form
              onSubmit={(e) => {
                isSubmitted.current = true;
                formik.handleSubmit(e);
              }}
              noValidate
            >
              <div className='custom-input'>
                <div className='mb-6'>
                  <FormTextField
                    key='username'
                    label='User Name'
                    formik={formik}
                    type='text'
                    name='userName'
                    required
                    isSubmitted={isSubmitted.current}
                  />
                </div>
              </div>
              <div className='custom-input'>
                <div className='mb-6'>
                  <FormTextField
                    key='email'
                    label='Email'
                    formik={formik}
                    type='text'
                    name='email'
                    required
                    isSubmitted={isSubmitted.current}
                  />
                </div>
              </div>
              <div className='custom-input'>
                <div className='mb-6 relative'>
                  <FormTextField
                    key='password'
                    label='Password'
                    formik={formik}
                    type={showPassword ? "text" : "password"}
                    name='password'
                    required
                    isSubmitted={isSubmitted.current}
                  />
                  <IconButton
                    className='!absolute top-[7px] right-[5px]'
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <Visibility fontSize='small' />
                    ) : (
                      <VisibilityOff fontSize='small' />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className='mb-[2.5rem]'>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: COLORS.primary,
                          "&.Mui-checked": {
                            color: "primary",
                          },
                        }}
                        value={rememberPassword}
                        onChange={() =>
                          setRememberPassword(!rememberPassword)
                        }
                      />
                    }
                    label='Do you want to save login state ?'
                  />
                </FormGroup>
              </div>
              <div>
                <Button
                  variant='contained'
                  size='large'
                  className='w-full custom-button'
                  type='submit'
                  disabled={isLoading}
                >
                  Sign up
                </Button>

                <span className='mt-6 italic block'>You already had an account?
                  <span
                    className='underline text-blue-400 ml-3 cursor-pointer'
                    onClick={() => navigate("/login")}
                  >Sign in</span>
                </span>
              </div>
            </form>
          </StyledLoginForm>
        </div>
      </div>
    </StyledSignUpPage>
  );
};
