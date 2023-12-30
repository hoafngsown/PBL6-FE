
import { Autocomplete, FormHelperText, InputBaseProps, OutlinedInputProps, TextField, styled } from '@mui/material';
import clsx from 'clsx';
import React, { CSSProperties, Dispatch, Ref, SetStateAction, forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { OBSERVER_OPTIONS } from './FormAutoCompleteSearch';

/* eslint-disable no-unused-vars */

export interface IOptionRecord {
  value: string;
  label: string;
  groupName?: string;
}

interface IFormAutoCompleteProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options?: IOptionRecord[];
  required?: boolean;
  onBlur?: (value) => void;
  inputStyle?: CSSProperties;
  maxLength?: number;
  noBorder?: boolean;
  multiple?: boolean;
  freeSolo?: boolean;
  shouldLoadMore?: boolean;
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  hideError?: boolean;
}
/* eslint-enable no-unused-vars */

const StyledTextField = styled(TextField)<{ noBorder?: boolean }>(({ theme, noBorder = false }) => ({
  borderRadius: '6px',
  border: noBorder ? '' : `1px solid ${theme.palette.grey['300']}`,
  '.MuiInputBase-input': {
    '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
      WebkitBackgroundClip: 'text',
      transition: 'background-color 5000s ease-in-out 0s',
      boxShadow: 'inset 0 0 20px 20px transparent',
    },
    '&::placeholder': {
      color: theme.components?.MuiInput?.styleOverrides?.root?.['::placeholder']?.color,
      opacity: 1
    }
  },
  '& fieldset': {
    border: 'none',
  },
  '.MuiFormHelperText-root': {
    marginLeft: 0,
    fontSize: '14px',
    lineHeight: '18px',
  }
}));

function FormAutoComplete<T extends FieldValues>({ freeSolo = true, ...props }: IFormAutoCompleteProps<T>) {

  const inputProps = useMemo(() => {
    const result: InputBaseProps['inputProps'] = {};

    if (props.maxLength) result['maxLength'] = props.maxLength;

    return result;
  }, [props.maxLength]);

  const InputProps = useMemo(() => {
    const result: Partial<OutlinedInputProps> = {};

    if (props.inputStyle) result['style'] = props.inputStyle;

    return result;
  }, [props.inputStyle]);

  const renderOption = useCallback((_props, option: string, _state) => {
    const groupName = props.options?.find((x) => x.value === option)?.groupName;
    const className = clsx('block p-3 cursor-pointer border border-grey-100 border-solid', { 'bg-orange-300': _state.selected });

    if (groupName) {
      return <div key={option} className={clsx('flex flex-col', className)}>
        <span {..._props} className="text-gray-400 text-sm block p-0">{groupName}</span>
        <span {..._props} className="block p-0">{option}</span>
      </div>;
    }

    return <span {..._props} key={option} className={className}>{option}</span>;
  }, [props.options]);

  const handleEmitEvent = useCallback(() => {
    props.setPage && props.setPage(prev => prev + 1);
  }, [props]);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({
        field: { value, onChange },
        fieldState: { error },
      }) => (
        <div className="flex flex-col gap-y-0.5 relative h-full rounded-[4px]">
          <div className={clsx('bg-white rounded-[4px]', props.label && 'flex flex-col px-3 pt-1.5')}>
            {props.label && (
              <label className="flex gap-x-1 leading-[22px] font-semibold text-grey-600 !text-base">
                <span>{props.label}</span>
                {props.required && <span className="text-error-light ml-1">*</span>}
              </label>
            )}
            <Autocomplete
              freeSolo={freeSolo}
              disableClearable
              multiple={props.multiple}
              disabled={props.disabled}
              value={props.multiple ? (typeof value === 'string' ? [] : value) : value}
              renderOption={(_props, option, _state) => renderOption(_props, option, _state)}
              options={props.options?.map((option) => option.label) || []}
              getOptionLabel={(option) => option}
              ListboxComponent={
                props.multiple
                  ? (propsListBox) => <ListboxComponent onEmitEvent={handleEmitEvent} shouldLoadMore={props.shouldLoadMore} {...propsListBox} />
                  : undefined
              }
              onChange={(_e: any, _value) => {
                _e.stopPropagation();
                onChange(_value);
              }}
              onBlur={(_e: any) => {
                if (_e.key === 'Enter') _e.stopPropagation();
                props.onBlur && props.onBlur(_e.target.value);
                !props.multiple && onChange(_e.target.value);
              }}
              renderInput={(params) =>
                <StyledTextField
                  {...params}
                  placeholder={props.placeholder}
                  label={props.label}
                  fullWidth
                  error={!!error}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    style: { ...params.InputProps['style'], ...InputProps.style }
                  }}
                  inputProps={{ ...params.inputProps, ...inputProps }}
                  noBorder={props.noBorder}
                />
              }
            />
          </div>

          {!props.hideError && error ? (
            <FormHelperText error={!!error?.message} className="flex items-center -mb-2">
              {error.message}
            </FormHelperText>
          ) : null}
        </div>
      )}
    />
  );
}

export const ListboxComponent = forwardRef(function ListboxComponent<T extends any = object>(props, ref: Ref<HTMLDivElement>) {

  const loadingRef = useRef<any>();
  const { children, onEmitEvent, shouldLoadMore, ...other } = props;

  // eslint-disable-next-line no-undef
  const eventEmitted = useCallback<IntersectionObserverCallback>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onEmitEvent();
    });
  }, [onEmitEvent]);

  useEffect(() => {
    const observer = new IntersectionObserver(eventEmitted, OBSERVER_OPTIONS);
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (loadingRef.current) observer.unobserve(loadingRef.current);
    };
  }, [loadingRef, eventEmitted]);

  return (
    <div ref={ref} className="max-h-[300px] overflow-y-scroll" {...other}>

      {(children as any[]).map((item) => <li key={item.key} {...item.props} />)}

      {shouldLoadMore && (children as any[])?.length > 9 &&
        <span
          className="block text-sm text-center font-medium text-ellipsis"
          ref={loadingRef} color="inherit">
          もっと読み込む
        </span>
      }
    </div>
  );
});

export default FormAutoComplete;

