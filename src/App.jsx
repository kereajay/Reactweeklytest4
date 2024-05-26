import { useState, createContext, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Employee from "./Employee.jsx";

export const Employeecontext = createContext();
const initialState = {
  projectemploye: [],
  // isclicked: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "addemployee":
      return {
        ...state,
        projectemploye: [...state.projectemploye, action.payload],
        // totalage: state.totalage + action.payload.age,
      };
      case "removeemployee":
        return {
          ...state,
          projectemploye: state.projectemploye.filter((employee) => employee.id !== action.payload),
          // totalage: state.totalage - action.payload.age,
        };
        case "sort":
          return {
            ...state,
            projectemploye: state.projectemploye.sort((a, b) => a.age - b.age),
            
          }
        default:
          return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Employeecontext.Provider value={{ state, dispatch }}>
        <Employee />
      </Employeecontext.Provider>
    </>
  );
}

export default App;
