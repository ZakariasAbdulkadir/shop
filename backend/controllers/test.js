import asyncHandler from 'express-async-handler'
import Service from '../models/serviceModel.js'

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find({})
    res.json(services)
})

// @desc    Fetch service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (service) {
    res.json(service)
  } else {
    res.status(404)
    throw new Error('Service not found')
  }
})

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (service) {
    await service.remove()
    res.json({ message: 'Service removed' })
  } else {
    res.status(404)
    throw new Error('Service not found')
  }
})

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const service = new Service({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    part: 'Sample Part',
    brand: 'Sample Brand',
    category: 'Sample Category',
    description: 'Sample Description',
  })

  const createdService = await service.save()
  res.status(201).json(createdService)
})

// @desc    Edit a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const { name, price, part, brand, category, description } = req.body

  const service = await Service.findById(req.params.id)

  if (service) {
    service.name = name
    service.price = price
    service.part = part
    service.brand = brand
    service.category = category
    service.description = description

    const updatedService = await service.save()
    res.json(updatedService)
  } else {
    res.status(404)
    throw new Error('Service not found')
  }
})

export {
  getServices,
  getServiceById,
  deleteService,
  createService,
  updateService,
}
