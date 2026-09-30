import { useEffect, useState, type FormEvent } from 'react'

type ContactDraft = {
  name: string
  email: string
  subject: string
  message: string
}

const contactDraftKey = 'homepage-contact-draft'

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
  const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim()

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!contactEmail) {
      setContactStatus('送信先が未設定です。.env の VITE_CONTACT_EMAIL に宛先を設定してください。')
      return
    }

    const subject = contactDraft.subject.trim() || `お問い合わせ: ${contactDraft.name}`
    const body = `お名前: ${contactDraft.name}\nメールアドレス: ${contactDraft.email}\n\n${contactDraft.message}`
    const query = new URLSearchParams({ subject, body })

    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?${query.toString()}`
    setContactStatus('メールアプリが開いたら、内容を確認して送信してください。')
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
              onChange={(event) => updateContactDraft('name', event.currentTarget.value)}
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
              onChange={(event) => updateContactDraft('email', event.currentTarget.value)}
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
              onChange={(event) => updateContactDraft('message', event.currentTarget.value)}
              required
            />
          </label>
          <div className="contact-actions">
            <button className="contact-submit" type="submit">
              メールを作成
            </button>
            <button className="contact-clear" type="button" onClick={clearDraft}>
              入力内容を消去
            </button>
          </div>
          <p className="contact-status" role="status" aria-live="polite">
            {contactStatus ||
              (contactEmail
                ? '送信ボタンを押すと、お使いのメールアプリが開きます。'
                : '.env の VITE_CONTACT_EMAIL に送信先を設定すると利用できます。')}
          </p>
          <p className="contact-storage-note">
            入力内容はこのブラウザーに保存されます。共有端末ではご注意ください。
          </p>
        </form>
      </div>
    </section>
  )
}