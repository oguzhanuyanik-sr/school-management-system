import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StudentList() {
  const [addPopupShow, setAddPopupShow] = useState(false);
  const [updatePopupShow, setUpdatePopupShow] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [updateData, setUpdateData] = useState({
    student_no: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    address: '',
    phone: '',
    midterm: '',
    final: '',
    homework: '',
  });

  useEffect(() => {
    getUsers();
  }, []);

  // Get All Users
  const getUsers = async () => {
    const res = await axios.get('https://school-system-app.vercel.app/list');

    if (res.status === 200) {
      setResponseData(res.data);
    }
  };

  // Get Specific User
  const getSpecificUser = async (id) => {
    const res = await axios.get(
      `https://school-system-app.vercel.app/list/${id}`
    );

    if (res.status === 200) {
      setUpdateData({
        ...res.data,
        birth_date: '',
        address: '',
        phone: '',
        midterm: '',
        final: '',
        homework: '',
      });
    }
  };

  // Add User
  const addUser = async (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      student_no: e.target.student_no.value,
      first_name: e.target.student_name.value,
      last_name: e.target.student_surname.value,
    });

    var config = {
      method: 'post',
      url: 'https://school-system-app.vercel.app/add',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function () {
        setAddPopupShow(false);
        getUsers();
      })
      .catch(function (error) {
        setAddPopupShow(false);
        console.log(error);
      });
  };

  // Update User
  const updateUser = async (e) => {
    var data = JSON.stringify({
      student_no: e.target.student_no.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      birth_date: e.target.birth_date.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      midterm: e.target.midterm.value,
      final: e.target.final.value,
      homework: e.target.homework.value,
    });

    var config = {
      method: 'patch',
      url: `https://school-system-app.vercel.app/update/${updateId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function () {
        setUpdatePopupShow(false);
        getUsers();
      })
      .catch(function (error) {
        setAddPopupShow(false);
        console.log(error);
      });
  };

  // Delete User
  const deleteUser = async (id) => {
    var config = {
      method: 'delete',
      url: `https://school-system-app.vercel.app/delete/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function () {
        getUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <main>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Student List</Navbar.Brand>
          <Nav className='me-end'>
            <Button variant='success' onClick={() => setAddPopupShow(true)}>
              Add New Student
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <div>
          <Modal show={addPopupShow} onHide={() => setAddPopupShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title className='w-100 text-center'>
                Add New Student
              </Modal.Title>
            </Modal.Header>
            <Form
              onSubmit={(e) => {
                addUser(e);
              }}
            >
              <Modal.Body>
                <Form.Group className='mb-3'>
                  <Form.Label>Student No</Form.Label>
                  <Form.Control type='number' name='student_no' required />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type='text' name='student_name' required />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type='text' name='student_surname' required />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='secondary'
                  onClick={() => setAddPopupShow(false)}
                >
                  Close
                </Button>
                <Button type='submit' variant='primary'>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={updatePopupShow}
            onHide={() => setUpdatePopupShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title className='w-100 text-center'>
                Update Student Details
              </Modal.Title>
            </Modal.Header>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(e);
              }}
            >
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Label>Student No</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.student_no}
                      name='student_no'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          student_no: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.first_name}
                      name='first_name'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          first_name: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.last_name}
                      name='last_name'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          last_name: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.birth_date}
                      name='birth_date'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          birth_date: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.address}
                      name='address'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.phone}
                      name='phone'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Midterm</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.midterm}
                      name='midterm'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          midterm: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Final</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.final}
                      name='final'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          final: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label>Homework</Form.Label>
                    <Form.Control
                      type='text'
                      value={updateData.homework}
                      name='homework'
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          homework: e.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='secondary'
                  onClick={() => setUpdatePopupShow(false)}
                >
                  Close
                </Button>
                <Button type='submit' variant='primary'>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
        <Table className='mt-5' striped bordered hover>
          <thead>
            <tr>
              <th className='text-center'>Student No</th>
              <th className='text-center'>First Name</th>
              <th className='text-center'>Last Name</th>
              <th className='text-center' colSpan={3}>
                Actions
              </th>
            </tr>
            {responseData.map((student, i) => (
              <tr id={student._id} key={i}>
                <td className='text-center'>{student.student_no}</td>
                <td className='text-center'>{student.first_name}</td>
                <td className='text-center'>{student.last_name}</td>
                <td className='text-center'>
                  <Link to={`/details/${student._id}`}>
                    <Button variant='secondary'>Details</Button>
                  </Link>
                </td>
                <td className='text-center'>
                  <Button
                    variant='primary'
                    onClick={() => {
                      setUpdateId(student._id);
                      getSpecificUser(student._id);
                      setUpdatePopupShow(true);
                    }}
                  >
                    Update
                  </Button>
                </td>
                <td className='text-center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      deleteUser(student._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </thead>
          <tbody></tbody>
        </Table>
      </Container>
    </main>
  );
}

export default StudentList;
