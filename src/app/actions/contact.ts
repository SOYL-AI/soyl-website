'use server'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: {
    name?: string
    email?: string
    message?: string
  }
}

export async function submitContact(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Artificial delay to simulate complex cryptographic handshakes protecting the vault route
  await new Promise(resolve => setTimeout(resolve, 1500))

  const errors: ContactFormState['errors'] = {}
  
  if (!name || name.trim() === '') {
    errors.name = 'Please tell us your name.'
  }

  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!message || message.trim() === '') {
    errors.message = 'Please write a message.'
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: "Something's missing — check the highlighted fields.",
      errors
    }
  }

  return {
    status: 'success',
    message: 'Message received.'
  }
}
