import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface FormContextType {
  requestCreation: boolean;
  setRequestCreationFormContext: (boolean: boolean) => void;
}
export const FormContext = createContext<FormContextType>({
  requestCreation: false,
  setRequestCreationFormContext: () => {},
});

export default function FormContextFactory({
  children,
}: {
  children: React.ReactNode;
}) {
  const [requestCreationForm, setRequestCreationFormContext] = useState(false);
  return (
    <FormContext.Provider
      value={{
        requestCreation: requestCreationForm,
        setRequestCreationFormContext,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
