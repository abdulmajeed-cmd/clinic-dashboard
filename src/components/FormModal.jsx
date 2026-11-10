import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

// Empty form values, used when adding a new patient
const emptyPatient = {
  rm: "",
  name: "",
  polyclinic: "",
  doctor: "",
  visitDate: "",
  status: "Waiting",
};

function FormModal({ show, handleClose, savePatient, patientToEdit }) {
  const [form, setForm] = useState(emptyPatient);

  // When the modal opens, fill the form with the patient being edited, or leave it empty for a new patient
  useEffect(() => {
    setForm(patientToEdit ? patientToEdit : emptyPatient);
  }, [patientToEdit, show]);

  // Update the matching field when the user types or picks an option
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate the name, save, and close the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    savePatient(form);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {patientToEdit ? "Edit Patient Data" : "Add Patient"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Medical Record No.</Form.Label>
            <Form.Control
              name="rm"
              value={form.rm}
              onChange={handleChange}
              placeholder="RM-0004"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Destination Clinic</Form.Label>
            <Form.Control
              name="polyclinic"
              value={form.polyclinic}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Responsible Doctor</Form.Label>
            <Form.Control
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Visit Date</Form.Label>
            <Form.Control
              type="date"
              name="visitDate"
              value={form.visitDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Waiting">Waiting</option>
              <option value="In Treatment">In Treatment</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {patientToEdit ? "Save Changes" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
