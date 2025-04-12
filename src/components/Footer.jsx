import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const base64Image =
  "data:image/png;base64,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";
const base64Image2 =
  "data:image/png;base64,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";
export default function Footer() {
  return (
    <footer className="bg-[#2cd59d] text-white pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Need Help */}
        <div>
          <h2 className="text-xl font-bold mb-4">Need Help</h2>
          <div className="flex items-start mb-2">
            <FaMapMarkerAlt className="text-white mt-1 mr-2" />
            <p>
              Ka 11/2A, Bashundhora R/A Road,
              <br /> Jagannathpur, Dhaka 1229
            </p>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <p>support@flyfarint.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="mr-2" />
            <p>+880 1755 572 099</p>
          </div>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaWhatsapp className="cursor-pointer" />
          </div>
        </div>

        {/* Discover */}
        <div>
          <h2 className="text-xl font-bold mb-4">Discover</h2>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Payment Method</li>
            <li>Terms and Condition</li>
            <li>Privacy Policy</li>
            <li>Refund & Cancellation Policy</li>
          </ul>
        </div>

        {/* Certification */}
        <div>
          <h2 className="text-xl font-bold mb-4">Certification</h2>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(5)].map((_, idx) => (
              <img
                key={idx}
                src={base64Image}
                alt="Certification"
                className="bg-white p-2 rounded"
              />
            ))}
          </div>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
          <p className="mb-4">
            Question or feedback we would love to hear from you
          </p>
          <div className="flex items-center border border-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent text-white px-4 py-2 outline-none flex-grow placeholder-white"
            />
            <button className="bg-white text-green-500 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Icons and Footer Bottom */}
      <div className="mt-10 text-center">
        <h3 className="text-lg font-bold mb-2">Pay With</h3>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[...Array(8)].map((_, idx) => (
            <img
              key={idx}
              src={base64Image2}
              alt="Payment"
              className="h-6 md:h-8 bg-white p-1 rounded"
            />
          ))}
        </div>
        <div className="text-sm border-t border-white pt-4">
          © Copyright 2025 by Fly Far Tech | B2C OTA Portal
        </div>
      </div>
    </footer>
  );
}
