import React, {useState} from 'react';
import EmailAPI from '../utils/EmailAPI';
import NavBar from '../components/NavBar';
import '../css/Contact.css';

function Contact() {
    const [form, setForm] = useState({
        name: '',
        emailAddress: '',
        message: ''
    })
    function handleSubmit() {
        EmailAPI(form);
        setForm({
            name: '',
            emailAddress: '',
            message: ''
        })
    }
    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    return (
        <NavBar/>
        <div className="Contact">
            <div className="Contact-row">
                <form className="Contact-form" onSubmit={handleSubmit}>
                    <div className="Contact-inputDiv">
                        <label for="name" className="Contact-label">
                            Name
                        </label>
                        <input 
                            id="name"
                            className="Contact-input"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Contact-inputDiv">
                        <label for="emailAddress" className="Contact-label">
                            Email Address
                        </label>
                        <input
                            id="emailAddress"
                            className="Contact-input"
                            name="emailAddress"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Contact-inputDiv">
                        <label for="message" className="Contact-label">
                            Message
                        </label>
                        <textarea
                            id="message" 
                            className="Contact-input"
                            name="message"
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <button className="Contact-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;