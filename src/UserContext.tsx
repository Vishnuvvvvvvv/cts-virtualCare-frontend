import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the user details, including gender
interface UserDetails {
  name: string;
  age: string; // Changed to string to align with text input
  dateOfBirth: string; // Date of birth as a string
  gender: string; // Gender as a string
}

// Define the shape of the context
interface UserContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  prescription: any;
  setPrescription: React.Dispatch<React.SetStateAction<any>>;
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  userDetails: UserDetails; // Updated to store name, age, dob, and gender
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>; // Setter for userDetails
  isPlanActivated: boolean | null;
  setIsPlanActivated: React.Dispatch<React.SetStateAction<boolean | null>>;
  isFollowUpDateReached: boolean | null;
  setIsFollowUpDateReached: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
}

// Create the context with an initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(0);
  const [prescription, setPrescription] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isPlanActivated, setIsPlanActivated] = useState<boolean | null>(false);
  const [isFollowUpDateReached, setIsFollowUpDateReached] = useState<
    boolean | null
  >(false);
  // Initialize userDetails state with default values, including gender
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "", // Default empty string for name
    age: "", // Default empty string for age, to align with text input
    dateOfBirth: "", // Default empty string for date of birth
    gender: "", // Default empty string for gender
  });

  return (
    <UserContext.Provider
      value={{
        step,
        setStep,
        prescription,
        setPrescription,
        isAuthenticated,
        setIsAuthenticated,
        userDetails, // Provide userDetails in the context
        setUserDetails, // Provide setter for userDetails
        isPlanActivated,
        setIsPlanActivated,
        isFollowUpDateReached,
        setIsFollowUpDateReached,
      }}
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
