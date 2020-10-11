import BlogLayout from 'src/layouts/BlogLayout'
import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      alert('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.info(data)
  }

  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroudColor: 'lavenderblush' }}
        />
        <Label errorClassName="error" name="name">
          Your Name
        </Label>
        <TextField
          name="name"
          className="input"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError style={{ color: 'red' }} name="name" />

        <Label errorClassName="error" name="email">
          Your Email{' '}
        </Label>
        <TextField
          name="email"
          className="input"
          errorClassName="error"
          validation={{ required: true, pattern: { value: /[^@]+@[^.]+\..+/ } }}
        />
        <FieldError style={{ color: 'red' }} name="email" />

        <Label errorClassName="error" name="message">
          Your Message{' '}
        </Label>
        <TextAreaField
          name="message"
          className="input"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError style={{ display: 'block', color: 'red' }} name="message" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
