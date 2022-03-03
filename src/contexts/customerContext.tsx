/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, ReactElement, useState } from 'react';

interface IContextProps {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const customerContext = createContext({} as IContextProps);

export default function CustomerProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [reload, setReload] = useState<boolean>(false);

  return (
    <customerContext.Provider value={{ reload, setReload }}>
      {children}
    </customerContext.Provider>
  );
}
