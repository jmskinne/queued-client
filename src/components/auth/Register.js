import React from "react"
import { Link } from "react-router-dom"


export const Register = (props) => {
    const firstName = React.createRef()
    const lastName = React.createRef()
    const email = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()
    const profile_image_url = React.createRef()
    

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "profile_image_url" : profile_image_url.current.value
            }

            return fetch(`https://queued-server-kft68.ondigitalocean.app/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("q_token", res.token)
                       
                        props.history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main class="bg-warm-grey-200 h-screen">

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <div class="text-center">
                <p class="text-warm-grey-900 text-4xl font-bold pt-3">Welcome to Queue, Register an Account</p>
            </div>
            <section class="flex flex-wrap items-center justify-center">
                <form className="w-full max-w-lg mt-12" onSubmit={handleRegister}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="firstName"> First Name </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={firstName} type="text" id="firstName" name="firstName" placeholder="First Name" required autoFocus />
                        </div>
                        <div class="w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="lastName"> Last Name </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={lastName} type="text" id="lastName" name="lastName" placeholder="Last Name" required autoFocus />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="inputEmail"> Email address </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={email} type="email" id="email" placeholder="Email address" required autoFocus />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-1/2 px-3">
                   
                        <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="inputPassword"> Password </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={password} type="password" id="password" placeholder="Password" required autoFocus />
                        </div>
                        <div class="w-1/2 px-3">
                   
                            <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="verifyPassword"> Verify Password </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                ref={verifyPassword} type="password" id="verifyPassword" placeholder="Verify Password" required autoFocus />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-warm-grey-700 text-xs font-bold mb-2" for="profile_img_url"> Picture link </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                            rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            ref={profile_image_url} type="text" id="profile_image_url" name="profile_image_url" placeholder="www.img.com/free.png" autoFocus />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3 flex justify-center">
                            <button class="px-8 py-3 border-warm-grey-900 border-transparent text-base font-medium 
                            rounded-md text-warm-grey-900 bg-lime-green-400 hover:bg-lime-green-900 hover:text-warm-grey-050"
                            type="submit">Register Account</button>
                        </div>
                    </div>
                </form>
            </section>
            <section className="flex flex-wrap items-center justify-center">
            <button class="px-3 py-1.5 border-warm-grey-900 border-transparent text-base font-medium
                rounded-md text-warm-grey-900 bg-cyan-400 hover:bg-cyan-900 hover:text-warm-grey-050">
                <Link to="/login">Already Registered? Login Here</Link>
                </button>
            </section>
        </main>
    )
}
