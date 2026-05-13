'use server'

/**
 * Newsletter signup server action.
 *
 * v1: UI is real, backend is a no-op. We validate the email so the form
 * gives meaningful feedback, then return success. No storage, no send.
 *
 * TODO before launch: wire to Resend (audience add + welcome email) or a
 * hosted provider (Buttondown, Beehiiv). The shape of `NewsletterState` is
 * deliberately identical to ContactFormState so the form component pattern
 * carries over.
 */

export type NewsletterState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: {
    email?: string
  }
}

// Permissive but real email check. Rejects empty, missing @, missing TLD.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim()

  // Brief artificial latency so the loading state is visible. Remove when
  // a real provider is wired (its own latency will replace this).
  await new Promise(r => setTimeout(r, 700))

  if (!email) {
    return {
      status: 'error',
      message: 'Email is required.',
      errors: { email: 'Please enter your email.' },
    }
  }

  if (!EMAIL_RE.test(email)) {
    return {
      status: 'error',
      message: 'That email looks off.',
      errors: { email: 'Please enter a valid email address.' },
    }
  }

  // TODO: replace with Resend Audience add + welcome email.
  // await resend.contacts.create({ email, audienceId: ... })

  return {
    status: 'success',
    message: "You're on the list.",
  }
}
