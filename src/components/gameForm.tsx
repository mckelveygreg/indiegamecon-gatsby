import { Field, Formik } from 'formik'
import React, { useState } from 'react'
import { animated, useTransition } from 'react-spring'
import styled from 'styled-components'
import * as yup from 'yup'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { StyledForm } from './styledForm'
import { TermsConditions } from './TermsConditions'
import { Recaptcha, executeCaptcha } from './Recaptcha'

const GameForm = () => {
  const [formSubmitted, setFormSubmitted] = useState()
  const [termsOpen, setTermsOpen] = useState()

  const transitions = useTransition(formSubmitted, null, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 'auto' },
    leave: { opacity: 0, height: 0 },
  })
  return (
    <>
      {transitions.map(({ item, key, props }) =>
        !item ? (
          <animated.div style={props} key={key}>
            <Formik
              initialValues={{
                formName: 'Games',
                igcYear: '2020',
                acceptedTerms: false,
                name: '',
                email: '',
                teamName: '',
                teamMembers: '',
                gameName: '',
                gameDescription: '',
                gameLink: '',
              }}
              validationSchema={yup.object().shape({
                name: yup.string().required('IDENTIFY YOURSELF!'),
                email: yup
                  .string()
                  .email("We can't hire you without a proper email")
                  .required("We can't hire you without a proper email"),
                gameName: yup
                  .string()
                  .required('Please give us the name of your game'),
                gameDescription: yup
                  .string()
                  .required('Please describe your game'),

                acceptedTerms: yup
                  .bool()
                  .oneOf([true], 'Please accept the terms and conditions'),
              })}
              onSubmit={async (values, actions) => {
                console.log('Form submitted')
                console.log(values)
                console.log(actions)
                scrollTo('body')

                setFormSubmitted(true)

                const response = await (
                  await fetch('/.netlify/functions/airtable', {
                    method: 'PATCH',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  })
                ).json()
                console.log(response)
              }}
            >
              {({
                touched,
                errors,
                isSubmitting,
                handleSubmit,
                isValid,
                setFieldValue,
              }) => (
                <StyledForm
                  onSubmit={executeCaptcha}
                  onSubmitCapture={executeCaptcha}
                >
                  <h3>Contact Registration</h3>
                  <p>
                    We need contact information for the person submitting the
                    game
                  </p>
                  <label htmlFor="name">Your Name:</label>
                  <Field
                    className={touched.name && errors.name ? 'invalid' : ''}
                    id="name"
                    type="text"
                    name="name"
                    required
                  />
                  <label htmlFor="email">Email:</label>
                  <Field
                    className={touched.email && errors.email ? 'invalid' : ''}
                    id="email"
                    type="email"
                    name="email"
                    required
                  />
                  {/* <ErrorMessage className="error" name="email" component={Error} /> */}

                  <h3>Game Registration</h3>
                  <p>
                    Now we need some information about the game you are
                    submitting
                  </p>
                  <label htmlFor="teamName">Team Name:</label>
                  <Field
                    className={
                      touched.teamName && errors.teamName ? 'invalid' : ''
                    }
                    id="teamName"
                    type="text"
                    name="teamName"
                  />
                  <label htmlFor="teamMembers">Team Members:</label>
                  <Field
                    className={
                      touched.teamMembers && errors.teamMembers ? 'invalid' : ''
                    }
                    id="teamMembers"
                    type="text"
                    name="teamMembers"
                  />
                  <label htmlFor="gameName">Game Name:</label>
                  <Field
                    className={
                      touched.gameName && errors.gameName ? 'invalid' : ''
                    }
                    id="gameName"
                    type="text"
                    name="gameName"
                    required
                  />

                  <label htmlFor="gameDescription">
                    Game Description: What do you do? How do you play?
                  </label>
                  <Field
                    className={
                      touched.gameDescription && errors.gameDescription
                        ? 'invalid'
                        : ''
                    }
                    id="gameDescription"
                    component="textarea"
                    name="gameDescription"
                    required
                  />

                  <label htmlFor="gameLink">Link to Game:</label>
                  <Field
                    className={
                      touched.gameLink && errors.gameLink ? 'invalid' : ''
                    }
                    id="gameLink"
                    type="text"
                    name="gameLink"
                  />

                  <label htmlFor="excited">
                    What are you most excited about at Indie Game Con?
                  </label>
                  <Field
                    id="excited"
                    type="text"
                    component="textarea"
                    name="excited"
                  />
                  <div className="terms">
                    <label htmlFor="acceptedTerms">
                      Accept <br />
                    </label>
                    <button
                      onClick={() => setTermsOpen(true)}
                      className="termsButton"
                      type="button"
                    >
                      Terms and Conditions
                    </button>
                  </div>
                  <Field
                    id="acceptedTerms"
                    name="acceptedTerms"
                    type="checkbox"
                    className="termsCheckbox"
                  />
                  <Recaptcha
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    setFieldValue={setFieldValue}
                  />
                  <TermsConditions open={termsOpen} setOpen={setTermsOpen} />
                </StyledForm>
              )}
            </Formik>
          </animated.div>
        ) : (
          <animated.h2 style={{ textAlign: 'center', ...props }} key={key}>
            Thanks, and talk to you soon!
            <hr />
          </animated.h2>
        )
      )}
    </>
  )
}

const Button = styled.button`
  margin: 3rem auto;
  padding: 1.5rem;
  display: inherit;
  width: auto;
  grid-column: 2 / 3;
  background: #2b2b2b;
  border: none;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 1px 5px #333;
  color: white;
  cursor: pointer;
  font-size: 2rem;

  :active,
  :hover {
    background: #555;
  }
  :active {
    -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
    -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
    box-shadow: inset 0px 0px 5px #c1c1c1;
    outline: none;
  }
  :disabled {
    background-color: #aaa;
  }
`

export const GameFormContainer = () => {
  const [formOpen, setFormOpen] = useState(false)

  const handleToggle = () => {
    setFormOpen(!formOpen)
  }

  const transitions = useTransition(formOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return (
    <>
      <Button onClick={handleToggle}>Submit Your Game!</Button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <GameForm />
            </animated.div>
          )
      )}
    </>
  )
}

export default GameFormContainer
