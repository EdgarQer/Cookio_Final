import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <div className="contact-content">
                <div className="contact-form">
                    <h2>Send us a message</h2>
                    <form className="contact-forms" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> contact@cookio.com</p>
                    <p><strong>Phone:</strong> +48 (123) 456790</p>
                    <p><strong>Address:</strong> 123 Recipe Street, Warszawa</p>
                </div>
            </div>
        </div> 
    );
};

export default ContactPage;