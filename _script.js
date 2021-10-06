const test = document.getElementById('test')

// const obj = { hello: 'world' }
// const blob = new Blob([JSON.stringify(obj, null, 2)], {
//   type: 'application/json',
// })

// console.log(blob)

// creating a URL representing the contents of a typed array
function typedArrayToURL(typedArray, mimeType) {
  return URL.createObjectURL(new Blob([typedArray.buffer], { type: mimeType }))
}

const bytes = new Uint8Array(59)

for (let i = 0; i < 59; i++) {
  bytes[i] = 32 + i
}

const url = typedArrayToURL(bytes, 'text/plain')

const link = document.createElement('a')
link.href = url
link.innerText = 'Open the array URL'

document.body.appendChild(link)

// extracting data from a blob
const reader = new FileReader()
reader.addEventListener('loadend', () => {
  // render.result contains the content of blob as a typed array
})

const file = new File(['foo'], 'foo.txt', {
  type: 'text/plain',
})

// 9-tab 16-shift 27-esc
//
if (this.isRequired) {
  if (this.min) {
    this.Field.classList[e.target.value ? 'add' : 'remove']('active')
    if (e.target.value.length >= this.min) this.Field.classList.remove('error')
  } else if (e.keyCode !== 9)
    if (e.target.value) this.Field.classList.remove('error')
}
