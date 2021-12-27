import { useState } from 'react';
import {Form, Formik,} from 'formik'
import * as Yup from 'yup'
import Card from './components/card'
import Content from './components/content'
import Input from './components/input'
import Button from './components/button'
import {Table, THead, TBody, TD, TH, TR} from './components/table';
import Crypt from './services/crypt'

const validate = Yup.object({
  message: Yup.string().test({
    name: 'required',
    params: { },
    message: 'It is necessary to enter the message',
    test: function(value) {
      if(cript){
        return value !== undefined
      }
      return true
    },
  }),
  cipherMsg: Yup.string().test({
    name: 'required',
    params: {},
    message: 'It is necessary to enter the cipher message',
    test: function(value) {
      if(!cript){
        return value !== undefined
      }
      return true
    }
  })
});

let cript = true

function App() {
  const [cryptFetch, setCryptFetch] = useState()
  const [decryptFetch, setDecryptFetch] = useState()

  const handleClick = (state, formik) => {
    cript = state
    formik.submitForm()
  }
  
  const handleSubmit = (values, formik) => {
    if(cript){
      fetchEncryptTable(Crypt.cryptData(values.message), values.message, formik)
    } else {
      fetchDecryptTable(Crypt.decryptData(values.cipherMsg), formik)
    }
  }

  const fetchEncryptTable = (data, message, formik) => {
    let conc = ''
    const fetch = data[0].map((item, index) => {
      conc += data[3][index]
      return (
        <TR key={index}>
          <TD>{message[index]}</TD>
          <TD>{item}</TD>
          <TD>{data[1][index]}</TD>
          <TD>{data[0][index] + data[1][index]}</TD>
          <TD>{data[2][index]}</TD>
          <TD>{data[3][index]}</TD>
        </TR>
      )
    })
    formik.setFieldValue('cipherMsg', conc)
    setCryptFetch(fetch)
  }

  const fetchDecryptTable = (data, formik) => {
    let conc = ''
    const fetch = data[0].map((item, index) => {
      conc += data[4][index]
      return (
        <TR key={index}>
          <TD>{item}</TD>
          <TD>{data[2][index]}</TD>
          <TD>{data[1][index]}</TD>
          <TD>{data[2][index] - data[1][index]}</TD>
          <TD>{data[3][index]}</TD>
          <TD>{data[4][index]}</TD>
        </TR>
      )
    })
    formik.setFieldValue('message', conc)
    setDecryptFetch(fetch)
  }
  return (
    <Content>
      <Formik
      onSubmit={handleSubmit}
      initialValues={{
        message: '',
        cipherMsg: ''
      }}
      validationSchema={validate}
      >
        {(formik) => (
          <Form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',width: '100%',height: '100%', margin: '0'}}>
            <Card>
              <Input title='Mensaje' name='message' />
              <Table>
                <THead>
                  <TR>
                    <TH>Char</TH>
                    <TH>Ascii Key</TH>
                    <TH>Random Key</TH>
                    <TH>Sum</TH>
                    <TH>Mod</TH>
                    <TH>Cipher</TH>
                  </TR>
                </THead>
                <TBody>
                  {cryptFetch}
                </TBody>
              </Table>
              <Button primary type='button' onClick={()=>handleClick(true, formik)}>Encrypt</Button>
              <Input title='Cipher message' name='cipherMsg' />
              <Table>
                <THead>
                  <TR>
                    <TH>Cipher</TH>
                    <TH>Mod</TH>
                    <TH>Key</TH>
                    <TH>Subst</TH>
                    <TH>Ascii Key</TH>
                    <TH>Char</TH>
                  </TR>
                </THead>
                <TBody>
                  {decryptFetch}
                </TBody>
              </Table>
              <Button primary type='button' onClick={()=>handleClick(false, formik)}>Decrypt</Button>
            </Card>
          </Form>
        )}
      </Formik>
    </Content>
  );
}

export default App;