import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Scores() {
  const [result, setResult] = useState({});
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
      setResult(res.data);
    }
  };

  return (
    <main>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Student Scores</Navbar.Brand>
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
              <th className='text-center'>Midterm</th>
              <th className='text-center'>Final</th>
              <th className='text-center'>Homework</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-center'>{result.student_no || '――'}</td>
              <td className='text-center'>{result.midterm || '――'}</td>
              <td className='text-center'>{result.final || '――'}</td>
              <td className='text-center'>{result.homework || '――'}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
}

export default Scores;
