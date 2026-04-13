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
    errors.name = 'Initiator designation is required.'
  }
  
  if (!email || !email.includes('@')) {
    errors.email = 'Valid Com-Link signature required.'
  }
  
  if (!message || message.trim() === '') {
    errors.message = 'Transmission payload cannot be completely empty.'
  }

  // Intercept transmission on missing payload constraints.
  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Transmission rejected. Validation constraints breached.',
      errors
    }
  }

  // Success path: Log integration.
  return {
    status: 'success',
    message: 'Handshake complete. Transmission logged securely.'
  }
}
