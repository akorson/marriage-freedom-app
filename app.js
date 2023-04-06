import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',\n  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const App = () => {
  const [firstName, setFirstName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [caseType, setCaseType] = React.useState('');
  const [bookingLink, setBookingLink] = React.useState('');

  const handleAttorneyConsultation = () => {
    const consultationData = {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      caseType,
    };

    axios
      .post('/attorney-consultation', consultationData)
      .then((response) => {
        setBookingLink(response.data.bookingLink);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDocumentAutomation = () => {
    const documentData = {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      caseType,
    };

    axios
      .post('/document-automation', documentData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const steps = [
    {
      id: 'intro',
      message: 'Hi! I am the Marriage Freedom Project chatbot. How can I assist you?',
      trigger: 'case-type',
    },
    {
      id: 'case-type',
      message: 'What type of case or question do you have?',
      trigger: 'case-type-response',
    },
    {
      id: 'case-type-response',
      options: [
        { value: 'Adoption', label: 'Adoption', trigger: 'name' },
        { value: 'Divorce', label: 'Divorce', trigger: 'name' },
        { value: 'Enforcement of Divorce Judgment', label: 'Enforcement of Divorce Judgment', trigger: 'name' },
        { value: 'Modification of Divorce Decree', label: 'Modification of Divorce Decree', trigger: 'name' },
        { value: 'Enforcement of Child Support', label: 'Enforcement of Child Support', trigger: 'name' },
        { value: 'Child Support', label: 'Child Support', trigger: 'name' },
        { value: 'Child Custody/Allocation of Parental Rights and Responsibilities', label: 'Child Custody/Allocation of Parental Rights and Responsibilities', trigger: 'name' },
        { value: 'Order of Protection', label: 'Order of Protection', trigger: 'name' },
        { value: 'Visitation for Non-Parent', label: 'Visitation for Non-Parent', trigger: 'name' },
        { value: 'Guardianship of Minor', label: 'Guardianship of Minor', trigger: 'name' },
      ],
    },
    {
      id: 'name',
      message: 'What is your first name?',
      trigger: 'first-name',
    },
    {\n      id: 'first-name',
      user: true,
      validator: (value) => {
        if (!value) {
          return 'Please enter your first name.';
        }
        return true;
      },
      trigger: 'middle-name',
    },
    {
      id: 'middle-name',
      message: 'What is your middle name?',
      trigger: 'last-name',
    },
    {
      id: 'last-name',
      message: 'What is your last name?',
      trigger: 'email',
    },
    {
      id: 'email',
      message: 'What is your email address?',
      trigger: 'phone-number',
      validator: (value) => {
        if (!value.match(/\S+@\S+\.\S+/)) {
          return 'Please enter a valid email address.';
        }
        return true;
      },
    },
    {
      id: 'phone-number',
      message: 'What is your phone number?',
      trigger: 'submit',
      validator: (value) => {
        if (!value.match(/^\d{10}$/)) {
          return 'Please enter a valid 10-digit phone number.';
        }
        return true;
      },
    },
    {
      id: 'submit',
      message: 'Thank you! Please click "Submit" to schedule a consultation.',
      trigger: 'confirmation',
    },
    {
      id: 'confirmation',
      component: (
        <div>
          Name: {firstName} {middleName} {lastName}
          <br />
          Email: {email}
          <br />
          Phone number: {phoneNumber}
          <br />
          Case type: {caseType}
          <br />
          <button onClick={handleAttorneyConsultation}>Schedule Consultation</button>
          <br />
          <b>{bookingLink}</b>
          <br />
          <button onClick={handleDocumentAutomation}>Automate Documents</button>
        </div>
      ),
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} />
    </ThemeProvider>
  );
};

export default App;
