import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { isArray, omit } from 'lodash';
import type { RequiredDataProps } from '../types';

type ContextKey = RequiredDataProps['id'];
type InputContext = HTMLInputElement | null;

export type SelectedKeysContextType<TKey extends ContextKey> = {
  add: (key: TKey | TKey[]) => void;
  remove: (key: TKey | TKey[]) => void;
  toggleKey: (key: TKey) => void;
  registerRef: (key: ContextKey, inputRef: InputContext) => void;
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
SelectedKeysContext.displayName = 'SelectedKeys';

export const useSelectedKeysContext = () => {
  const context = useContext(SelectedKeysContext);
  if (!context) {
    throw new Error('useSelectedKeysContext must be used within a SelectedKeysProvider');
  }
  return context;
};

type SelectedKeysProviderProps = PropsWithChildren & {
  onSelectedKeysUpdated?: (selectedKeys: ContextKey[]) => void;
};

export type SelectedKeysObj = {
  data: RefObject<ReadonlySet<ContextKey>>;
  controls: Omit<SelectedKeysContextType<ContextKey>, 'registerRef' | 'removeRef'>;
};

function SelectedKeysProviderComponent(
  { children, onSelectedKeysUpdated }: SelectedKeysProviderProps,
  ref: ForwardedRef<SelectedKeysObj>,
) {
  const selectedKeysRef = useRef(new Set<ContextKey>());
  const checkboxesRef = useRef(new Map<ContextKey, NonNullable<InputContext>>());

  const selectedKeysUpdated = useCallback(() => {
    // TODO: It is not performant, it is better to create difference between old and new state and change accordingly, but still works very fast
    [...checkboxesRef.current.entries()].forEach(([entryId, checkbox]) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = selectedKeysRef.current.has(entryId);
    });
    onSelectedKeysUpdated?.([...selectedKeysRef.current]);
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

  const registerRef = useCallback((key: ContextKey, inputRef: InputContext) => {
    if (inputRef === null) return;

    checkboxesRef.current.set(key, inputRef);
  }, []);

  const removeRef = useCallback((key: ContextKey) => {
    checkboxesRef.current.delete(key);
  }, []);

  const contextMethods = useMemo(
    () => ({ add, remove, toggleKey, registerRef, removeRef, clear }),
    [add, remove, toggleKey, registerRef, removeRef, clear],
  );

  useImperativeHandle(
    ref,
    () => ({ data: selectedKeysRef, controls: omit(contextMethods, ['registerRef', 'removeRef']) }),
    [selectedKeysRef, contextMethods],
  );

  return <SelectedKeysContext.Provider value={contextMethods}>{children}</SelectedKeysContext.Provider>;
}

export const SelectedKeysProvider = forwardRef(SelectedKeysProviderComponent);
