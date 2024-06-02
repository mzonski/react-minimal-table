import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { remove } from 'lodash';
import type { RequiredDataProps } from '../types';
import { getTypedKeys } from '#/minimal-table/min-table.utils';

type ContextKey = RequiredDataProps['id'];

export type SelectedKeysContextType<TKey extends ContextKey> = {
  addKey: (key: TKey) => void;
  removeKey: (key: TKey) => void;
  toggleKey: (key: TKey) => void;
  registerRef: (key: ContextKey, inputRef: HTMLInputElement | null) => void;
  removeRef: (key: ContextKey) => void;
};

const initialContextValue: SelectedKeysContextType<ContextKey> = {
  addKey: () => null,
  removeKey: () => null,
  toggleKey: () => null,
  registerRef: () => null,
  removeRef: () => null,
};

const SelectedKeysContext = createContext<SelectedKeysContextType<ContextKey>>(initialContextValue);

export const useSelectedKeysContext = () => {
  const context = useContext(SelectedKeysContext);
  if (!context) {
    throw new Error('useSelectedKeysContext must be used within a SelectedKeysProvider');
  }
  return context;
};

type SelectedKeysProviderProps = PropsWithChildren & {
  onSelectedKeysUpdated: (selectedKeys: ContextKey[]) => void;
};

function SelectedKeysProviderComponent(
  { children, onSelectedKeysUpdated }: SelectedKeysProviderProps,
  ref: ForwardedRef<SelectedKeysContextType<ContextKey>>,
) {
  // TODO: rozdziel to na 2 konteksty bo syf sie robi
  const [selectedKeys, setSelectedKeys] = useState<ContextKey[]>([]);
  const checkboxRefBag = useRef<Record<ContextKey, HTMLInputElement | null>>({});

  useEffect(() => {
    const registeredInputs = checkboxRefBag.current;
    if (!registeredInputs) return;

    // TODO: Refactor this piece of shit
    const allKeys = Object.keys(registeredInputs).map((key) => Number(key));
    console.log('=>(selected-id-context.tsx:63) allKeys', allKeys);
    const checkedKeys = [...selectedKeys];
    // eslint-disable-next-line no-restricted-syntax
    for (const key of selectedKeys) {
      if (key in registeredInputs) {
        const checkbox = registeredInputs[key];
        if (checkbox === null) return;
        checkbox.checked = true;
        remove(allKeys, (k) => k === key);
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key of allKeys) {
      if (key in registeredInputs) {
        const checkbox = registeredInputs[key];
        if (checkbox === null) return;
        checkbox.checked = false;
        remove(allKeys, (k) => k === key);
      }
    }

    console.log('Synchronization success', allKeys.length === 0);
  }, [selectedKeys]);

  useEffect(() => {
    onSelectedKeysUpdated(selectedKeys);
  }, [selectedKeys, onSelectedKeysUpdated]);

  const addKey = useCallback((key: ContextKey) => {
    setSelectedKeys((prevKeys) => [...prevKeys, key]);
  }, []);

  const removeKey = useCallback((key: ContextKey) => {
    setSelectedKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  }, []);

  const toggleKey = useCallback((key: ContextKey) => {
    setSelectedKeys((prevKeys) => (prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]));
  }, []);

  const registerRef = useCallback((key: ContextKey, inputRef: HTMLInputElement | null) => {
    checkboxRefBag.current[key] = inputRef;
  }, []);

  const removeRef = useCallback((key: ContextKey) => {
    delete checkboxRefBag.current[key];
  }, []);

  const contextMethods = useMemo(
    () => ({ addKey, removeKey, toggleKey, registerRef, removeRef }),
    [addKey, removeKey, toggleKey, registerRef, removeRef],
  );

  useImperativeHandle(ref, () => contextMethods, [contextMethods]);

  return <SelectedKeysContext.Provider value={contextMethods}>{children}</SelectedKeysContext.Provider>;
}

export const SelectedKeysProvider = forwardRef(SelectedKeysProviderComponent);
