import React, { useContext, useState, useRef } from "react";
import { employees } from "./Data";
import { Employeecontext } from "./App";
import { toast } from "react-toastify";

function Employee() {
    let tage = 0;

    const refs = useRef([]);
    const butttonRefs = useRef({});
    const { state, dispatch } = useContext(Employeecontext);

    const handleonclick = (id, employee) => {
        const cdiv = refs.current[id];
        if (cdiv) {
            cdiv.style.backgroundColor = "#ff4d4d";
        }

        dispatch({ type: "addemployee", payload: employee });

        if (butttonRefs.current[id]) {
            butttonRefs.current[id].style.display = "none";
        }
        toast.success(`${employee.first_name} added to team`, {
            position: "top-center",
            autoClose: 2000,

        })
    };
    const handlereomve = (id, employee) => {
        dispatch({ type: "removeemployee", payload: id });
        const cdiv = refs.current[id];
        if (cdiv) {
            cdiv.style.backgroundColor = "grey";
        }
        if (butttonRefs.current[id]) {
            butttonRefs.current[id].style.display = "block";
        }
        toast(`${employee.first_name} removed from team`, {
            position: "top-center",
            autoClose: 2000,
        })
    }

    const handlesort = () => {
        //   state.projectemploye.sort((a,b)=>a.age-b.age)
        //   console.log(state.projectemploye)
        dispatch({ type: "sort" })
    }

    // shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-green-200

    return (
        <div>
            <div className="w-[90%] m-auto flex gap-8 justify-center mt-20">
                <div className="w-[40%] h-[60vh] overflow-auto py-4 px-4   no-scrollbar ">
                    <h1 className="text-3xl font-bold text-center  ">Employees</h1>
                    <br />
                    <br />

                    {employees.map((employee) => {
                        return (
                            <>
                                <div
                                    ref={(el) => (refs.current[employee.id] = el)}
                                    key={employee.id}
                                    className="flex justify-between px-10 py-2 bg-gray-500"
                                >
                                    <h1 className="text-xl text-white">{employee.first_name} </h1>
                                    <h1>{employee.age}</h1>
                                    <button
                                        className="bg-blue-400 py-1 px-4"
                                        onClick={() => handleonclick(employee.id, employee)}
                                        ref={(el) => (butttonRefs.current[employee.id] = el)}
                                    >
                                        Add
                                    </button>
                                </div>
                                <br />
                            </>
                        );
                    })}
                </div>
               {state.projectemploye.length>0 && <div className="w-[40%] h-[60vh] overflow-auto py-4 px-4 no-scrollbar">
                    <h1 className="text-3xl font-bold text-center">Team</h1>
                    <br />

                    {state.projectemploye &&
                        state.projectemploye.map((employee) => {
                            return (
                                <>
                                    <div className="flex justify-between px-10 py-2 bg-gray-500">
                                        <h1 className="text-xl text-white">
                                            {employee.first_name}{" "}
                                        </h1>
                                        <h1>{employee.age}</h1>
                                        <button
                                            className="bg-blue-400 py-1 px-4"
                                            onClick={() => handlereomve(employee.id, employee)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <br />
                                </>
                            );
                        })}
                    {state.projectemploye.map((employeeage) => {
                        tage += employeeage.age;
                    })}
                    {tage > 0 && (
                        <h1 className="text-lg font-bold">
                            Average Age:- {tage / state.projectemploye.length}
                        </h1>
                    )}
                    <br />
                    <button onClick={handlesort} className=" py-1 px-4 border-2 border-white ">Sort by age</button>
                </div>
}

            </div>
        </div>
    );
}

export default Employee;
