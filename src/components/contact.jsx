// --- FRONTEND: ContactPage.jsx ---
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://foodzilla-backend.onrender.com/api/contact', form);
      toast.success('Message sent successfully');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pt-24">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us 📬</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="w-full border p-2 rounded h-32"
          required
        ></textarea>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;