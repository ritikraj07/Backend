console.log("==================> hello")

let searchParms = new URLSearchParams(window.location.search)

let code = searchParms.get('code')

console.log(code)

async function singInUser() {
    try {
        let response = await fetch(`/auth/signInWithGithub/${code}`)
        response = await response.json();

        let user = response.user;
        let div = document.createElement('div')
        div.innerHTML = `<img src=${user.image} />`
        document.body.appendChild(div)
        
    } catch (err) {
        console.error(err)
    }
    
    
}
if (code) {
    singInUser()
}
