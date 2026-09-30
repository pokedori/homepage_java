import { useEffect, useState, type FormEvent } from 'react'

type ContactDraft = {
  name: string
  email: string
  subject: string
  message: string
}

const contactDraftKey = 'homepage-contact-draft'

// ブラウザーに保存された入力内容を読み込み、取得できない場合は空の入力データを返す。
function loadContactDraft(): ContactDraft {
  const emptyDraft: ContactDraft = { name: '', email: '', subject: '', message: '' }

  try {
    const savedDraft = localStorage.getItem(contactDraftKey)
    if (!savedDraft) return emptyDraft

    const parsedDraft: unknown = JSON.parse(savedDraft)
    if (typeof parsedDraft !== 'object' || parsedDraft === null) return emptyDraft

    const values = parsedDraft as Partial<ContactDraft>
    return {
      name: typeof values.name === 'string' ? values.name : '',
      email: typeof values.email === 'string' ? values.email : '',
      subject: typeof values.subject === 'string' ? values.subject : '',
      message: typeof values.message === 'string' ? values.message : '',
    }
  } catch {
    return emptyDraft
  }
}

export function ContactForm() {
  const [contactStatus, setContactStatus] = useState('')
  const [contactDraft, setContactDraft] = useState<ContactDraft>(loadContactDraft)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactApiUrl = (import.meta.env.VITE_CONTACT_API_URL ?? '').trim()

  useEffect(() => {
    try {
      if (Object.values(contactDraft).every((value) => value === '')) {
        localStorage.removeItem(contactDraftKey)
      } else {
        localStorage.setItem(contactDraftKey, JSON.stringify(contactDraft))
      }
    } catch {
      setContactStatus('入力内容をこのブラウザーに保存できませんでした。')
    }
  }, [contactDraft])

  function updateContactDraft(field: keyof ContactDraft, value: string) {
    setContactDraft((currentDraft) => ({ ...currentDraft, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const requiredFields = ['name', 'email', 'message'] as const
    for (const fieldName of requiredFields) {
      const field = form.elements.namedItem(fieldName)
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity(field.value.trim() ? '' : '空白以外の文字を入力してください。')
      }
    }

    if (!form.reportValidity()) return

    if (!contactApiUrl) {
      setContactStatus('送信APIが未設定です。.env の VITE_CONTACT_API_URL にURLを設定してください。')
      return
    }

    setIsSubmitting(true)
    setContactStatus('送信しています...')
    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactDraft),
      })

      if (!response.ok) throw new Error(`Request failed: ${response.status}`)

      setContactDraft({ name: '', email: '', subject: '', message: '' })
      setContactStatus('お問い合わせを送信しました。')
    } catch {
      setContactStatus('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  function clearDraft() {
    setContactDraft({ name: '', email: '', subject: '', message: '' })
    setContactStatus('保存した入力内容を消去しました。')
  }

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="contact-content">
        <div className="contact-heading">
          <p className="contact-eyebrow">CONTACT</p>
          <h2 id="contact-title">お問い合わせ</h2>
          <p>ご質問やご相談はこちらからお送りください。</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            お名前
            <input
              name="name"
              type="text"
              autoComplete="name"
              value={contactDraft.name}
              onChange={(event) => {
                event.currentTarget.setCustomValidity('')
                updateContactDraft('name', event.currentTarget.value)
              }}
              required
            />
          </label>
          <label>
            メールアドレス
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={contactDraft.email}
              onChange={(event) => {
                event.currentTarget.setCustomValidity('')
                updateContactDraft('email', event.currentTarget.value)
              }}
              required
            />
          </label>
          <label>
            件名 <span className="optional-label">任意</span>
            <input
              name="subject"
              type="text"
              value={contactDraft.subject}
              onChange={(event) => updateContactDraft('subject', event.currentTarget.value)}
            />
          </label>
          <label>
            お問い合わせ内容
            <textarea
              name="message"
              rows={6}
              value={contactDraft.message}
              onChange={(event) => {
                event.currentTarget.setCustomValidity('')
                updateContactDraft('message', event.currentTarget.value)
              }}
              required
            />
          </label>
          <div className="contact-actions">
            <button className="contact-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
            <button className="contact-clear" type="button" onClick={clearDraft}>
              入力内容を消去
            </button>
          </div>
          <p className="contact-status" role="status" aria-live="polite">
            {contactStatus ||
              (contactApiUrl
                ? 'お問い合わせ内容を送信できます。'
                : '.env の VITE_CONTACT_API_URL に送信APIのURLを設定してください。')}
          </p>
          <p className="contact-storage-note">
            入力内容はこのブラウザーに保存されます。共有端末ではご注意ください。
          </p>
        </form>
      </div>
    </section>
  )
}