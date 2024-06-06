import { useEffect, useState } from "react";
import useLoggedIn from "../useLoggedIn";
import axios from "axios";

export function ViewEmployee() {
    const [employees, setEmployees] = useState([]);
    const [editing, setEditing] = useState(undefined);



    useLoggedIn();

    useEffect(() => {
        axios
            .get("http://localhost:4000/employees")
            .then((response) => {
                console.log(response.data);
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        console.log("Employee changed", employees);
        setEditing(undefined);
    }, [employees]);

    const handleDelete = (ID) => {
        axios
            .delete("http://localhost:4000/employee/" + ID.toString())
            .then((response) => {
                console.log(response);
                setEmployees(employees.filter((employee) => employee.ID !== ID));
            });
    };

    const onChange = (e) => {
        setEditing((old) => ({ ...old, [e.target.name]: e.target.value }));
    };

    const onSave = () => {
        axios.put("http://localhost:4000/employee", editing).then((response) => {
            console.log(response.data);
            setEmployees((old) =>
                [...old].map((e) => (e.ID == editing.ID ? editing : e))
            );
        });
    };

    return (
        <div>
        <body className="view-employee">
        <div className="employee-records-container">
            <h2>Employee Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => {
                        const isEditing = emp.ID === editing?.ID;
                        return (
                            <tr key={emp.ID}>
                                <td>{emp.ID}</td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            name="Name"
                                            value={editing.Name}
                                            onChange={onChange}
                                        />
                                    ) : (
                                        <span>{emp.Name}</span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input name="Age" value={editing.Age} onChange={onChange} />
                                    ) : (
                                        <span>{emp.Age}</span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            name="City"
                                            value={editing.City}
                                            onChange={onChange}
                                        />
                                    ) : (
                                        <span>{emp.City}</span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            name="Position"
                                            value={editing.Position}
                                            onChange={onChange}
                                        />
                                    ) : (
                                        <span>{emp.Position}</span>
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            name="Salary"
                                            value={editing.Salary}
                                            onChange={onChange}
                                        />
                                    ) : (
                                        <span>{emp.Salary}</span>
                                    )}
                                </td>
                                <td>
                                    {editing ? (
                                        <>
                                            <button onClick={onSave}>Save Data</button>
                                            <button
                                                onClick={() => {
                                                    setEditing(undefined);
                                                }}
                                            >
                                                Discard
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEditing(emp);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(emp.ID)}>
                                                Delete Record
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="trademark-container">
                <p>© The Sherpa Codes 2023</p>
            </div>
        </div>
        </body>
        </div>
        
    );
}