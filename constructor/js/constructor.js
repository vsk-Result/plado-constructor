let editable = pladoConstructor({
    showOnInit: true,
    debug: true,
    defaultEndpoint: '/constructor/php/server.php',
    headers: {
        'Authorization': 'Bearer your-token'
    },
})

const security = document.createElement('div')
security.classList.add('security')

const securityPassword = document.createElement('input')
securityPassword.type = 'password'
securityPassword.placeholder = 'Введите пароль'
security.append(securityPassword)

document.body.append(security)
securityPassword.focus()

securityPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (e.target.value === 'dashaiscool') {
            security.remove()
        } else {
            e.target.value = ''
        }
    }
})