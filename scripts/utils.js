'use strict'

class Component {
  constructor(el, name) {
    this.name = name
    this[this.name] = el
  }
}

class Field extends Component {
  constructor(field) {
    super(field, 'Field')
    this.key = this.Field.dataset.name
    this.pattern = this.Field.dataset.pattern || null
    this.input = Array.from(this.Field.children).find((element) =>
      element.classList.contains('input'),
    )
    this.required =
      this.Field.dataset.required === '' ||
      this.Field.dataset.required === 'true'
        ? true
        : false
    this.activate()
  }

  activate() {
    this.Field.addEventListener('change', (e) => {
      this.Field.classList[e.target.value.length ? 'add' : 'remove']('active')

      const { success, message } = this.validate(e.target.value)
      if (success) this.okay()
      else this.error()
    })
  }

  validate() {
    const str = this.input.value
    let err_msg = null,
      res = false
    // /[a-zA-Z\d^-_.]{4,}@[a-zA-Z\d^.-]+[.]+[a-zA-Z]/ -- email pattern
    // const patterns = { email: /[a-zA-Z\d^-_.]{4,}@[a-zA-Z\d^.-]+[.]+[a-zA-Z]/ }
    if (str.length)
      if (this.pattern) {
        const rgx = new RegExp(this.pattern)
        if (rgx.test(str)) res = true
        else {
          res = false
          err_msg = 'invalid input'
        }
      } else res = true
    else {
      res = false
      err_msg = 'empty field'
    }
    return { success: res, message: err_msg }
  }

  error() {
    this.Field.classList.remove('okay')
    this.Field.classList.add('error')
  }
  okay() {
    this.Field.classList.remove('error')
    this.Field.classList.add('okay')
  }
}

class Form extends Component {
  constructor(form, submit = null) {
    super(form, 'Form')
    this.fields = null
    this.buttons = null
    this.formData = null
    this.submit = submit
    Object.preventExtensions(this)
    this.extractChildren()
    this.prepare()
  }

  prepare() {
    this.Form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSubmit()
      if (e.key === 'Escape') this.clearForm()
    })
    for (let btn of this.buttons) {
      btn.addEventListener('click', () => {
        btn.classList.contains('submit') && this.handleSubmit()
      })
    }
  }

  handleSubmit() {
    if (this.validate())
      if (this.submit)
        this.submit(this.formData, 'Oops! there might be something wrong')
      else return console.log('request denied')
  }

  validate() {
    const keys = Object.keys(this.formData)
    for (let key of keys) {
      this.formData[key] = this.fields[key].input.value
    }
    block: for (let key of keys) {
      const res = this.fields[key].validate()
      // console.log(res.message)
      if (!res.success) {
        this.fields[key].input.focus()
        this.fields[key].error()
        return false
      }
    }
    return true
  }

  clearForm() {
    console.log('clear')
  }

  extractChildren() {
    const fields = Array.from(this.Form.children)
    const filterChildren = (class_name, property = null) => {
      const filtered = fields.filter((child) =>
        child.classList.contains(class_name),
      )
      if (property) if (filtered.length) return (this[property] = filtered)
      if (filtered.length) return filtered
    }
    filterChildren('form-btn', 'buttons')
    let fieldsList
    if ((fieldsList = filterChildren('field'))) {
      let data = null,
        resultArr = null
      fieldsList.forEach((field) => {
        if (field.dataset.name) {
          const newField = new Field(field)
          data = { ...data, [newField.key]: newField.input.value }
          resultArr = { ...resultArr, [newField.key]: newField }
        }
      })
      this.fields = resultArr ? resultArr : null
      this.formData = data ? data : null
    }
  }
}

const main = document.querySelector('main')
const toast = (message) => {
  const fragment = new DocumentFragment()
  const toast = document.createElement('span')
  const msg = document.createElement('span')
  const button = document.createElement('button')

  toast.className = 'toast'
  msg.className = 'message'
  button.className = 'icn-btn mini hide-toast'

  msg.innerText = message
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.66 6.66">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="cls-1"
            x1="0.5"
            y1="6.16"
            x2="6.16"
            y2="0.5"
          />
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="cls-1"
            x1="6.16"
            y1="6.16"
            x2="0.5"
            y2="0.5"
          />
        </g>
      </g>
    </svg>
  `
  toast.appendChild(msg)
  toast.appendChild(button)
  fragment.appendChild(toast)
  main.appendChild(fragment)
}
// store({
//   firstName: 'Jane',
//   lastName: 'De Leon',
//   email: 'jd@gmail.com',
//   username: 'jd_69',
//   password: 'ughugh',
// })
export default Form
// const signin_form = document.querySelector('.form-wrap.signin')
// const log_form = new Form(signin_form)
// reg_form.submit = store(reg_form.formData)
