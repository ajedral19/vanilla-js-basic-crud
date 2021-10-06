// const Form = require('./utils')
import Form from './utils.js'

const store = (formData, responseMessage) => {
  if (!localStorage.getItem('my-blog'))
    localStorage.setItem('my-blog', JSON.stringify({ rows: [], rowCount: 0 }))
  const data = JSON.parse(localStorage.getItem('my-blog'))
  let rows = data.rows,
    rowCount
  if (formData) {
    if (formData.password !== formData.repassword) {
      toast("Password didn't match")
      return
    }
    rows = [...rows, formData]
    rowCount = rows.length
    localStorage.setItem('my-blog', JSON.stringify({ rows, rowCount }))
    toast(formData.username + ' save')
    window.location = '/login.html'
  } else toast(responseMessage)
}

const register_form = document.querySelector('.form-wrap.register')
new Form(register_form, store)
