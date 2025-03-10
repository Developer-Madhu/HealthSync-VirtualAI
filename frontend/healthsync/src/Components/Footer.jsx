import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-black w-full py-6 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-semibold">HealthSync</div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <a href="#" className="hover:text-gray-600">Get Started</a>
          <a href="#" className="hover:text-gray-600">Contact Us</a>
          <a href="#" className="hover:text-gray-600">FAQs</a>
          <a href="#" className="hover:text-gray-600">Blog Posts</a>
          <a href="#" className="hover:text-gray-600">Support Center</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-gray-600"><FaFacebookF /></a>
          <a href="#" className="hover:text-gray-600"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-600"><FaXTwitter /></a>
          <a href="#" className="hover:text-gray-600"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-gray-600"><FaYoutube /></a>
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>© 2025 Virtual Health Assistant. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700">Terms of Use</a>
          <a href="#" className="hover:text-gray-700">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
