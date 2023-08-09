import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Details() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSpecificUser(id);
    }
  }, [id]);

  const getSpecificUser = async (id) => {
    const res = await axios.get(
      `https://react-school-system.vercel.app/list/${id}`
    );

    if (res.status === 200) {
      setUser(res.data);
    }
  };

  return (
    <main>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Student Details</Navbar.Brand>
          <Nav className='me-end'>
            <Link to='/'>
              <Button variant='success'>Go Homepage</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Table className='mt-5' striped bordered hover>
          <thead>
            <tr>
              <th className='text-center'>Student No</th>
              <th className='text-center'>Date of birth</th>
              <th className='text-center'>Address</th>
              <th className='text-center'>Phone number</th>
              <th className='text-center' colSpan={3}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-center'>{user.student_no || '――'}</td>
              <td className='text-center'>{user.birth_date || '――'}</td>
              <td className='text-center'>{user.address || '――'}</td>
              <td className='text-center'>{user.phone || '――'}</td>
              <td className='text-center'>
                <Link to={`/scores/${user._id}`}>
                  <Button variant='secondary'>Exam scores</Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
}

export default Details;
