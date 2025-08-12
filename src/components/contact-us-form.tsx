export default function ContactUsForm() {
  return (
    <form className="flex flex-col gap-5 px-5">
      <input
        name="name"
        placeholder="Name"
        className="bg-gray-100 px-3 py-2 rounded-sm outline-none"
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        className="bg-gray-100 px-3 py-2 rounded-sm outline-none"
      />
      <textarea
        name="message"
        placeholder="Message"
        className="bg-gray-100 px-3 py-2 rounded-sm outline-none"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="bg-primary p-2 rounded-md text-white cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
