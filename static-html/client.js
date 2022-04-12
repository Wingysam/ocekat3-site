const postsUl = document.querySelector('#posts')
const textbox = document.querySelector('#text')
const button = document.querySelector('#send')

button.addEventListener('click', async () => {
  button.disabled = true
  await fetch('/submit', {
    method: 'POST',
    body: JSON.stringify({
      text: textbox.value
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
  textbox.value = ''
  button.disabled = false
  await updatePostsList()
})

async function updatePostsList() {
  const res = await fetch('/posts')
  const data = await res.json()
  while (postsUl.children.length) {
    postsUl.firstChild.remove()
  }
  for (const text of data) {
    const li = document.createElement('li')
    li.textContent = text
    postsUl.appendChild(li)
  }
}

async function main() {
  await updatePostsList()
}
main()