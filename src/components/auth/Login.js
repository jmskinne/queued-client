import React, { useContext } from "react"
import { Link } from "react-router-dom"
// import "./Auth.css"




export const Login = props => {
   

    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()

    const handleLogin = (e) => {
        e.preventDefault()
        return fetch("https://queued-server-tv5uq.ondigitalocean.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && "token" in res) {
                    
                    localStorage.setItem( "q_token", res.token )
                    
                    props.history.push("/")
                }
                else {
                    
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="bg-warm-grey-200 h-screen">
            <div class="text-center">
                <p class="text-warm-grey-900 text-4xl font-bold pt-3">Welcome to Queue</p>
            </div>
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section class="flex flex-wrap items-center justify-center">
                <form className="w-full max-w-lg mt-12" onSubmit={handleLogin}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="inputEmail"> Email address </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={email} type="email" id="email" placeholder="Email address" required autoFocus />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                   
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="inputPassword"> Password </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={password} type="password" id="password" placeholder="Password" required autoFocus />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3 flex justify-center">
                            <button class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium 
                            rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050"
                            type="submit">Sign In</button>
                        </div>
                    </div>
                       
                </form>
            </section>
            <section class="flex flex-wrap items-center justify-center">
                <button class="px-3 py-1.5 border-warm-grey-900 border-transparent text-base font-medium
                rounded-md text-warm-grey-900 bg-cyan-400 hover:bg-cyan-900 hover:text-warm-grey-050"><Link to="/register">Not a member yet?</Link>
                </button>
            </section>
        </main>
    )
}