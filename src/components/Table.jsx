import React, { useRef, useEffect } from "react";
import $ from "jquery";
import { Table, Badge, Button } from "react-bootstrap";

// Returns a badge color based on the patient's status (if/else)
function getStatusVariant(status) {
  if (status === "Completed") {
    return "success";
  } else if (status === "In Treatment") {
    return "warning";
  } else {
    return "secondary";
  }
}

// Displays the patient list. It receives data and actions as props from App.
function PatientTable({ patients, openEditModal, deletePatient }) {
  // Reference to the wrapper div, so jQuery can animate it
  const wrapperRef = useRef(null);

  // Fade the table in once when it first appears (jQuery DOM effect)
  useEffect(() => {
    $(wrapperRef.current).hide().fadeIn(800);
  }, []);

  return (
    <div ref={wrapperRef} className="table-responsive">
      <Table striped hover bordered className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Medical Record No.</th>
            <th>Patient Name</th>
            <th>Destination Clinic</th>
            <th>Responsible Doctor</th>
            <th>Visit Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.rm}</td>
              <td>{patient.name}</td>
              <td>{patient.polyclinic}</td>
              <td>{patient.doctor}</td>
              <td>{patient.visitDate}</td>
              <td>
                <Badge bg={getStatusVariant(patient.status)}>
                  {patient.status}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => openEditModal(patient)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deletePatient(patient.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PatientTable;
