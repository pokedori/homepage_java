import './style.css'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

const appElement = document.querySelector<HTMLDivElement>('#app')

if (!appElement) {
  throw new Error('App root element was not found')
}

createRoot(appElement).render(createElement(App))
