import { postApi } from "@/api/api";
import { API_PATH } from "@/api/path";
import FormTextField from "@/components/form/FormTextField";
import { COLORS } from "@/constants";
import { signInSchema } from '@/libs/validations/login';
import { NotifyTypeEnum, notify } from '@/utils/toast';
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
import { useFormik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

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

interface ILoginFormProps {
  onSuccess: (result: any, saveToken: boolean) => void;
}

export const LoginForm = (
  props: React.PropsWithChildren<ILoginFormProps>
) => {
  const navigate = useNavigate();
  const isSubmitted = React.useRef(false);
  const [rememberPassword, setRememberPassword] =
    useState(false);

  const formik = useFormik<IFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema: signInSchema,
    onSubmit: (values) => { mutate(values) },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (loginRequest: any) =>
      postApi(API_PATH.LOGIN, loginRequest, ""),
    onSuccess: (res) => {
      props?.onSuccess(res.data, rememberPassword);
      notify('Login Sucess', NotifyTypeEnum.SUCCESS);
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
    <StyledLoginForm>
      <div>
        <h1 className='text-[2rem] text-center font-medium mb-[2.5rem]'>
          Đăng Nhập
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
              key='id'
              label='ID'
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
            Login
          </Button>

          <span className='mt-6 italic block'>You don't have an account?
            <span
              className='underline text-blue-400 ml-3 cursor-pointer'
              onClick={() => navigate("/signup")}
            >Sign up</span>
          </span>
        </div>
      </form>
    </StyledLoginForm>
  );
};
