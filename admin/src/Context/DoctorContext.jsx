import { createContext } from "react";

   

export const DoctorContext = createContext();


const DoctorContextProvider = ({ children }) => {
    const value = {
        // Define any state or functions you want to provide to the context
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
}


export default DoctorContextProvider;