import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { isArray } from 'lodash';
import type { RequiredDataProps } from '../types';

type ContextKey = RequiredDataProps['id'];

export type SelectedKeysContextType<TKey extends ContextKey> = {
  add: (key: TKey | TKey[]) => void;
  remove: (key: TKey | TKey[]) => void;
  toggleKey: (key: TKey) => void;
  registerRef: (key: ContextKey, inputRef: HTMLInputElement | null) => void;
  removeRef: (key: ContextKey) => void;
  clear: () => void;
};

const initialContextValue: SelectedKeysContextType<ContextKey> = {
  add: () => null,
  remove: () => null,
  toggleKey: () => null,
  registerRef: () => null,
  removeRef: () => null,
  clear: () => null,
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
  const selectedKeysRef = useRef(new Set<ContextKey>());
  const checkboxRefBag = useRef(new Map<ContextKey, HTMLInputElement>());

  const selectedKeysUpdated = useCallback(() => {
    [...checkboxRefBag.current.entries()].forEach(([entryId, checkbox]) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = selectedKeysRef.current.has(entryId);
    });
    onSelectedKeysUpdated([...selectedKeysRef.current]);
  }, [onSelectedKeysUpdated]);

  const addSingle = useCallback((key: ContextKey) => {
    if (selectedKeysRef.current.has(key)) return;
    selectedKeysRef.current.add(key);
  }, []);
  const removeSingle = useCallback((key: ContextKey) => {
    if (!selectedKeysRef.current.has(key)) return;
    selectedKeysRef.current.delete(key);
  }, []);

  const add = useCallback(
    (val: ContextKey | ContextKey[]) => {
      if (isArray(val)) {
        val.forEach(addSingle);
      } else {
        addSingle(val);
      }

      selectedKeysUpdated();
    },
    [selectedKeysUpdated, addSingle],
  );

  const remove = useCallback(
    (val: ContextKey | ContextKey[]) => {
      if (isArray(val)) {
        val.forEach(removeSingle);
      } else {
        removeSingle(val);
      }

      selectedKeysUpdated();
    },
    [selectedKeysUpdated, removeSingle],
  );

  const toggleKey = useCallback(
    (key: ContextKey) => {
      const isSelected = selectedKeysRef.current.has(key);
      if (isSelected) {
        remove(key);
      } else {
        add(key);
      }
      selectedKeysUpdated();
    },
    [add, remove, selectedKeysUpdated],
  );

  const clear = useCallback(() => {
    selectedKeysRef.current.clear();
    selectedKeysUpdated();
  }, [selectedKeysUpdated]);

  const registerRef = useCallback((key: ContextKey, inputRef: HTMLInputElement | null) => {
    if (inputRef === null) return;

    checkboxRefBag.current.set(key, inputRef);
  }, []);

  const removeRef = useCallback((key: ContextKey) => {
    checkboxRefBag.current.delete(key);
  }, []);

  const contextMethods = useMemo(
    () => ({ add, remove, toggleKey, registerRef, removeRef, clear }),
    [add, remove, toggleKey, registerRef, removeRef, clear],
  );

  useImperativeHandle(ref, () => contextMethods, [contextMethods]);

  return <SelectedKeysContext.Provider value={contextMethods}>{children}</SelectedKeysContext.Provider>;
}

export const SelectedKeysProvider = forwardRef(SelectedKeysProviderComponent);
