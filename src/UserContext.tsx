import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the user and file data
// const [prescription,setPrescription] = useState({})
// Define the shape of the context
interface UserContextType {
  step: number; // Add step here
  setStep: React.Dispatch<React.SetStateAction<number>>; // Add setStep here
  prescription: any; // You can replace `any` with the specific type you have for the prescription object
  setPrescription: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with an initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(0); // Initialize step
  const [prescription, setPrescription] = useState({});
  return (
    <UserContext.Provider
      value={{ step, setStep, prescription, setPrescription }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
