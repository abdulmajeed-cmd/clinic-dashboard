import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import AppNavbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FormModal from "./components/FormModal";
import PatientTable from "./components/Table";

// Sample patient data: an array of objects
const initialPatients = [
  {
    id: 1,
    rm: "RM-0001",
    name: "Budi Santoso",
    polyclinic: "General Clinic",
    doctor: "Dr. Andi Pratama",
    visitDate: "2026-11-08",
    status: "Completed",
  },
  {
    id: 2,
    rm: "RM-0002",
    name: "Siti Aminah",
    polyclinic: "Pediatric Clinic",
    doctor: "Dr. Rina Lestari",
    visitDate: "2026-11-09",
    status: "In Treatment",
  },
  {
    id: 3,
    rm: "RM-0003",
    name: "Ahmad Fauzi",
    polyclinic: "Dental Clinic",
    doctor: "Dr. Dewi Sartika",
    visitDate: "2026-11-10",
    status: "Waiting",
  },
];

function App() {
  const [patients, setPatients] = useState(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Only the first two menu items show patient data. The others are placeholders.
  const isPatientView =
    activeMenu === "Dashboard" || activeMenu === "Patient List";

  // Keep only patients whose name or medical record number contains the search text
  const term = searchTerm.trim().toLowerCase();
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(term) || p.rm.toLowerCase().includes(term),
  );

  // Open the modal to add a new patient
  const openAddModal = () => {
    setPatientToEdit(null);
    setShowModal(true);
  };

  // Open the modal to edit an existing patient
  const openEditModal = (patient) => {
    setPatientToEdit(patient);
    setShowModal(true);
  };

  // Close the modal and clear the selected patient
  const closeModal = () => {
    setShowModal(false);
    setPatientToEdit(null);
  };

  // Update an existing patient, or add a new one if we weren't editing
  const savePatient = (form) => {
    if (patientToEdit) {
      setPatients(
        patients.map((p) =>
          p.id === patientToEdit.id ? { ...form, id: p.id } : p,
        ),
      );
    } else {
      setPatients([...patients, { ...form, id: Date.now() }]);
    }
  };

  // Remove a patient from the list
  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <>
      <AppNavbar onToggleSidebar={() => setShowSidebar(true)} />

      <Container fluid>
        <Row>
          {/* Sidebar: fixed on desktop, slide-out on smaller screens */}
          <Sidebar
            show={showSidebar}
            handleClose={() => setShowSidebar(false)}
            activeMenu={activeMenu}
            onSelectMenu={setActiveMenu}
          />

          {/* Main content: full width on mobile, 3/4 width on desktop */}
          <Col xs={12} lg={9} xl={10} className="p-4">
            <Card className="shadow-sm rounded border-0 mt-2">
              <Card.Body>
                {isPatientView ? (
                  <>
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                      <h1 className="h3 mb-0">
                        Patient Medical Record Dashboard
                      </h1>
                      <Button variant="primary" onClick={openAddModal}>
                        + Add Patient
                      </Button>
                    </div>

                    {/* Search box: filters the table as the user types */}
                    <Form.Control
                      type="search"
                      placeholder="Search by patient name or medical record number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-4"
                    />

                    <PatientTable
                      patients={filteredPatients}
                      openEditModal={openEditModal}
                      deletePatient={deletePatient}
                    />
                  </>
                ) : (
                  // Placeholder for menu items that are not built yet
                  <div className="text-center py-5">
                    <h1 className="h3">{activeMenu}</h1>
                    <p className="text-muted mb-0">
                      This page is not built yet.
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <FormModal
        show={showModal}
        handleClose={closeModal}
        savePatient={savePatient}
        patientToEdit={patientToEdit}
      />
    </>
  );
}

export default App;
