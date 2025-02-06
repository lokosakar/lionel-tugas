import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userService from '../services/userService';

const AddUserModal = ({ onClose, onUserAdded }) => {
  const initialValues = { name: '', email: '', role: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(3, 'Minimum 3 characters'),
    email: Yup.string().email('Invalid email format').required('Required'),
    role: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await userService.addUser(values);
      console.log('User added:', response);
      onUserAdded();
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="modal">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field type="text" name="role" placeholder="Role" />
          <ErrorMessage name="role" component="div" />
          <button type="submit">Add User</button>
          <button type="button" onClick={onClose}>Close</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUserModal;
