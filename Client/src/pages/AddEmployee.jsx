import { useState } from "react";
import axios from "axios";
const initVal = {
    Name: "",
    Age: "",
    City: "",
    Position: "",
    Salary: '',
};

export function AddEmployee() {
    const [employee, setEmployee] = useState(initVal);
    const [complaint, setComplaint] = useState("");
    const [complaintSubmitted, setComplaintSubmitted] = useState(false);

    function submitComplaint() {
        if (complaint === "") {
            return;
        }
        console.log(complaint);
        setComplaint("");
        setComplaintSubmitted(true);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const parsedData = {
            Name: employee.Name,
            Age: parseInt(employee.Age),
            City: employee.City,
            Position: employee.Position,
            Salary: parseInt(employee.Salary),
        };

        // Send a POST request to the API endpoint to add the employee data
        axios
            .post("http://localhost:4000/addEmployee", parsedData)
            .then((response) => {
                console.log("Success");
                console.log(response.data);
                setEmployee(initVal);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onChange = (e) => {
        setEmployee((old) => ({ ...old, [e.target.name]: e.target.value }));
    };

    return (
        <div>
        <body className="add-employee">
        <div className="app-container">
            <div className="information-container">
                <form onSubmit={onSubmit}>
                    <label>Name:</label>
                    <input
                        name="Name"
                        type="text"
                        onChange={onChange}
                        value={employee.Name}
                        required
                    />

                    <label>Age:</label>
                    <input
                        name="Age"
                        type="number"
                        onChange={onChange}
                        value={employee.Age}
                        required
                    />

                    <label>City:</label>
                    <input
                        name="City"
                        type="text"
                        onChange={onChange}
                        value={employee.City}
                        required
                    />

                    <label>Position:</label>
                    <input
                        name="Position"
                        type="text"
                        onChange={onChange}
                        value={employee.Position}
                        required
                    />

                    <label>Salary:</label>
                    <input
                        name="Salary"
                        type="number"
                        onChange={onChange}
                        value={employee.Salary}
                        required
                    />

                    <button type="submit">Add Employee</button>
                </form>
            </div>
            <div className="complaint-container">
                <h2>Submit a Complaint</h2>
                {complaintSubmitted ? (
                    <p>Thank you for your complaint!</p>
                ) : (
                    <>
                        <textarea
                            placeholder="Type your complaint here"
                            onChange={(event) => setComplaint(event.target.value)}
                        />
                        <button onClick={submitComplaint}>Submit</button>
                    </>
                )}
            </div>
            <div className="contact-container">
                <h2>Contact Admin:</h2>
                <p>Email: admin@thesherpacodes.com</p>
                <p>Phone: +977-9807441628</p>
            </div>
            <div className="trademark-container">
                <p>© The Sherpa Codes 2023</p>
            </div>
        </div>
        </body>
        </div>
    );
}
