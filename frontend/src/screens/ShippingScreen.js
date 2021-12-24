import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shippingAddress) {
      return
    }
    setAddress(shippingAddress.address)
    setCity(shippingAddress.city)
    setPostalCode(shippingAddress.postalCode)
    setCountry(shippingAddress.country)
  }, [shippingAddress])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))

    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter City'
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='country'
            placeholder='Enter Country'
            value={country}
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
