const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected with MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      /**
       * Validator function for the phone number field.
       * @param {String} n - The phone number to validate
       * @returns {Boolean} True if the phone number is valid, false otherwise
       * The validator function will return true if the phone number is prefixed
       * with 2 or 3 numbers and the remaining 6 numbers are separated by a dash.
       * The numbers can be separated by a dash after the first 2 or 3 numbers.
       * Example: 02-123456, 012-345678, 123-456789.
       */
      validator: (n) => {
        return /^(\d{2}-\d{6}|\d{3}-d{6})$/.test(n)
      },
      /**
       * Error message to be displayed when the phone number does not match the
       * specified format.
       * @param {Object} props - The properties object passed to the validator
       * @returns {String} The error message string
       */
      message: (props) =>
        `${props.value} The number must be prefixed with 2 or 3 numbers!`,
    },
    required: [true, 'User Phone number required'],
  },
})

/**
 * This function is used to transform the output of the toJSON method.
 * It takes two parameters: the document and the returned object.
 * It adds an id property to the returned object and assigns it the value of the _id property.
 * It then deletes the _id and __v properties from the returned object.
 * @param {Object} document - The document to be transformed
 * @param {Object} returnedObject - The object to be transformed
 * @returns {Object} The transformed object
 */
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

personSchema.path('name').validate((name) => {
  if (name.length < 3) {
    throw new Error(
      'Path `name` `{VALUE}` is shorter than the minimun allowed length (3)'
    )
  }
  return true
}, 'Person validation failed: Name: Path `name` `{VALUE}` is shorter than the minimun allowed length (3)')

const Person = mongoose.model('Person', personSchema)

module.exports = Person
