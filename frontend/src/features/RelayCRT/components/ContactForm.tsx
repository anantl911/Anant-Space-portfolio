import { useState } from 'react';
import { backendApi } from '@/api/axios';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { placeholder, value } = e.target;
    const key = placeholder === 'Name' ? 'name' : placeholder === 'Email' ? 'email' : 'content';
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (!formData.name.trim() || formData.name.trim().length < 5) {
      setErrorMsg('At least put a proper name bro (min 5 chars).');
      setStatus('error');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email.');
      setStatus('error');
      return;
    }
    if (!formData.content.trim()) {
      setErrorMsg('Message content cannot be empty.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg(null);

    try {
      await backendApi.post('/messages/send', formData);
      setStatus('success');
      setFormData({ name: '', email: '', content: '' });
    } catch (err: any) {
      setStatus('error');
      const apiErrors = err?.response?.data?.errors;
      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        setErrorMsg(apiErrors[0]);
      } else {
        setErrorMsg(err?.response?.data?.message || 'Something went wrong. Try again later.');
      }
    }
  };

  const isSuccess = status === 'success';
  const isLoading = status === 'loading';

  return (
    <form
      id="contact-form"
      className="flex flex-col items-center mt-8 mb-10"
      onSubmit={handleSubmit}
    >
      <div id="email-name-inputs" className="flex gap-20">
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
          className="bg-black w-[31vw] text-white border-b-2 border-[#facd8a] outline-none text-[clamp(13px,1.2vw,16px)] pb-4 px-2 disabled:opacity-50"
          placeholder="Name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
          className="bg-black w-[31vw] text-white border-b-2 border-[#facd8a] outline-none text-[clamp(13px,1.2vw,16px)] pb-4 px-2 disabled:opacity-50"
          placeholder="Email"
        />
      </div>

      <div id="message-input" className="flex gap-20 my-20">
        <textarea
          value={formData.content}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
          className="bg-black w-[68vw] text-white border-b-2 border-[#facd8a] outline-none text-[clamp(13px,1.2vw,16px)] min-h-15 pb-4 px-2 disabled:opacity-50"
          placeholder="Got ideas worth working on? Here to suggest me good game, book, movie or a play? Go ahead :)"
        />
      </div>

      <div id="form-error-msg" className="min-h-[12px]">
        {errorMsg && (
          <p className="text-red-400 text-sm mb-4 text-center max-w-[68vw] animate-pulse">
            {errorMsg}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          id="send-contact-btn"
          disabled={isLoading || isSuccess}
          className={`text-xl md:text-2xl py-1 px-4 transition duration-500 min-w-[120px] flex items-center justify-center h-10 md:h-12 ${isSuccess
            ? 'bg-white text-black cursor-not-allowed font-medium'
            : isLoading
              ? 'bg-[rgb(250,205,138)] text-black cursor-wait'
              : 'bg-[rgb(250,205,138)] text-black hover:cursor-pointer hover:bg-white'
            }`}
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : isSuccess ? (
            'Sent'
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
