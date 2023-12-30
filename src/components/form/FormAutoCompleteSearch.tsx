import { Autocomplete, Popper, TextField, autocompleteClasses, styled } from '@mui/material';
import clsx from 'clsx';
import { HTMLAttributes, ReactChild, ReactNode, Ref, forwardRef, useCallback, useEffect, useRef, useState } from 'react';

export interface ISelectOption<ValueType extends string = string> {
  label: string;
  value: ValueType;
}

/* eslint-disable no-unused-vars */
type IServiceReponse<T extends any = object> = Promise<[ISelectOption[], T[]]>;
type IListBoxCustomProps<T extends any = object> = HTMLAttributes<HTMLElement> & {
  onEmitEvent: () => void;
  isLastPage: boolean;
  onSelectItem: (item: ISelectOption) => void;
  listData: T[];
  renderOption?: (record: T) => ReactNode;
  selectedField?: (keyof T) | string;
}

type IStyle = {
  noBorder?: boolean;
}

interface IProps<T extends any = object> {
  label: string;
  placeholder?: string;
  service: (page: number, keyword: string) => IServiceReponse<T>;
  onSelect: (item: T) => void;
  disabled?: boolean;
  className?: string;
  selectedField: keyof T;
  defaultInputValues?: string;
  style?: IStyle;
  required?: boolean;
  key?: string | number;
  renderOption?: (record: T) => ReactNode;
}
/* eslint-enable no-unused-vars */

export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
};

function FormAutoCompleteSearch<T extends any = object>(props: IProps<T>) {
  const countNumberOpenRef = useRef(0);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [valueInput, setValueInput] = useState(props.defaultInputValues || '');
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [listData, setListData] = useState<T[]>([]);

  const handleSelectItem = (item: ISelectOption) => {
    const object = listData.find((x) => x[props.selectedField as string] === item.value) as T;
    setValueInput(item.label);
    props.onSelect(object);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const cachedKeyword = event.target.value;
    setValueInput(cachedKeyword);

    if (typingRef.current) clearTimeout(typingRef.current);

    typingRef.current = setTimeout(async () => {
      const [optionResponse, dataResponse] = await props.service(0, cachedKeyword);
      setOptions(optionResponse);
      setListData(dataResponse);
    }, 300);
  };

  const handleEmitEvent = useCallback(async () => {
    const [optionResponse, dataResponse] = await props.service(page + 1, valueInput);

    if (optionResponse.length === 0 || dataResponse.length === 0) {
      // Code below mean last page
      setPage(-1);
    } else {
      setOptions(prev => ([...prev, ...optionResponse]));
      setListData(prev => ([...prev, ...dataResponse]));
      setPage(x => x + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, valueInput]);

  // // INIT FETCH SERVICE WHEN FIRST OPEN THE AUTO COMPLETE
  useEffect(() => {
    (async () => {
      if (countNumberOpenRef.current === 0 && isOpen) {
        const [optionResponse, dataResponse] = await props.service(page, valueInput);

        setOptions(optionResponse);
        setListData(dataResponse);

        countNumberOpenRef.current = ++countNumberOpenRef.current;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countNumberOpenRef, isOpen]);

  return (

    <div className={clsx('h-full bg-white rounded-[4px]',
      { 'flex flex-col px-3 pt-1.5': props.label },
      { 'h-auto': props.style?.noBorder }
    )}>

      {
        props.label &&
        <label className="flex gap-x-1 leading-[22px] font-semibold text-grey-600 !text-base">
          <span>{props.label}</span>
          {props.required && <span className="text-error-light ml-1">*</span>}
        </label>
      }

      <Autocomplete
        disableListWrap
        disabled={props.disabled}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        PopperComponent={StyledPopper}
        options={options}
        getOptionLabel={(option: any) => option ? option.label : ''}
        renderOption={(props, option, state) => [props, option, state] as ReactNode}
        inputValue={valueInput}
        noOptionsText="No"
        ListboxComponent={(propsListBox) =>
          <ListboxComponent
            {...propsListBox}
            selectedField={props.selectedField as string}
            renderOption={props.renderOption}
            listData={listData}
            onEmitEvent={handleEmitEvent}
            isLastPage={page === -1}
            onSelectItem={handleSelectItem}
          />}
        renderInput={(params) =>
          <StyledTextField
            {...params}
            fullWidth
            disabled={props.disabled}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'disabled'
            }}
            InputProps={{
              ...params.InputProps,
              style: { WebkitBoxShadow: '0 0 0 1000px white inset' },
              className: 'border border-grey-300 border-solid'
            }}
            value={valueInput}
            onChange={handleInputChange}
            placeholder={props.placeholder}
            className={clsx(props.className)}
            variant="outlined"
            noBorder={props.style?.noBorder}
          />
        }
      />
    </div>
  );
}

export const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

// Adapter for react-window
export const ListboxComponent = forwardRef(function ListboxComponent<T extends any = object>(props: IListBoxCustomProps<T>, ref: Ref<HTMLDivElement>) {

  const loadingRef = useRef<any>();
  const { children, onEmitEvent, isLastPage, onSelectItem, listData, renderOption, selectedField, ...other } = props;

  const listOptions: ISelectOption[] = [];

  (children as ReactChild[]).forEach((item: ReactChild & { children?: ReactChild[] }) => {
    const option = item[1];
    listOptions.push(option);
  });

  // eslint-disable-next-line no-undef
  const eventEmitted = useCallback<IntersectionObserverCallback>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onEmitEvent();
    });
  }, [onEmitEvent]);

  const handleRenderOption = (option: ISelectOption<string>) => {
    if (renderOption && selectedField) {
      const object = listData.find((x) => x[selectedField as string] === option.value) as T;
      return renderOption(object);
    }

    return option.label;
  };

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

      {listOptions.map((item) =>
        <li
          key={item.value + item.label}
          className="p-2 cursor-pointer transition-all hover:bg-grey-200"
          onClick={() => onSelectItem(item)}
        >
          {handleRenderOption(item)}
        </li>
      )}

      {!isLastPage && listOptions.length > 9 &&
        <span
          className="block text-sm text-center font-medium text-ellipsis"
          ref={loadingRef} color="inherit">
          もっと読み込む
        </span>
      }
    </div>
  );
});

const StyledTextField = styled(TextField)<{ noBorder?: boolean }>(({ theme, noBorder }) => {
  const defaultCSS = {
    borderRadius: theme.shape.borderRadius,
    padding: '0',
    '& .MuiInputBase-root': {
      padding: '0',
      position: 'relative',
    },
    '.MuiInputBase-input': {
      padding: '0',
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
        WebkitBackgroundClip: 'text',
        // "-webkit-text-fill-color": "#ffffff",
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
  };

  if (noBorder) {
    return {
      ...defaultCSS,
      border: 'none',
      '& .MuiInputBase-root': {
        padding: '0',
        position: 'relative',
        border: 'none',
      },
      '.MuiInputBase-input': {
        padding: '0px !important',
        '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
          WebkitBackgroundClip: 'text',
          // "-webkit-text-fill-color": "#ffffff",
          transition: 'background-color 5000s ease-in-out 0s',
          boxShadow: 'inset 0 0 20px 20px transparent',
        },
        '&::placeholder': {
          color: theme.components?.MuiInput?.styleOverrides?.root?.['::placeholder']?.color,
          opacity: 1
        }
      },
    };
  }

  return defaultCSS;
});
export default FormAutoCompleteSearch;