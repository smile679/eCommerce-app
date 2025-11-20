import fb from "../../assets/fb.png";
import instagram from "../../assets/instagram.png";
import pinterest from "../../assets/pinterest.png";
import whatsApp from "../../assets/whatsApp.png";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="Contact" className="w-full mt-10 ">
      <div className="relative min-w-fit flex flex-col justify-between px-3 sm:px-10 pt-10 bg-orange-300">
        <svg class="absolute -top-2 left-0 w-full h-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L110,0C35,150 35,0 0,100z" fill="#ffffff"></path>
        </svg>
        {/* <div className="w-full max-w-7xl mx-auto flex max-sm:flex-col justify-between items-center pt-5">
          <Link
            to="/shop/home"
            smooth={true}
            duration={500}
            className="cursor-pointer max-sm:mb-5 items-center"
          >
            <img
              src={"https://res.cloudinary.com/dineyc77u/image/upload/v1763633845/Gemini_Generated_Image_6b093b6b093b6b09-removebg-preview_sjsgje.png"}
              alt="Merkato gebeya"
              className="w-50"
            />
          </Link>
          <div className="flex max-sm:flex-col items-center">
            <h2 className="text-xl text-green-600 font-bold sm:mr-10">Follow us</h2>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={fb} alt="Facebook" className="w-10 h-10"/>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Instagram" className="w-10 h-10" />
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={pinterest} alt="Pinterest" className="w-10 h-10" />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsApp} alt="WhatsApp" className="w-12 h-12" />
              </a>
            </div>
          </div>
        </div> */}
        {/* <Separator className="bg-chart-5 mx-auto w-11/12" /> */}
        <div className="w-full flex justify-evenly items-center my-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-green-600 font-bold">About Us</h1>
            <p className="font-semibold">(+251) 326-1234</p>
            <p className="font-semibold">info@example.com</p>
            <p className="font-semibold">south 13th street</p>
            <p className="font-semibold">Ethiopia, Addis Ababa</p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-green-600 font-bold">Explore</h1>
              <p className="font-semibold">Home</p>
              <p className="font-semibold">About</p>
              <p className="font-semibold">Contact</p>
              <p className="font-semibold">Services</p>
          </div>
          <div className="hidden sm:flex flex-col gap-3">
            <h1 className="text-xl text-green-600 font-bold">Recent News</h1>
            <p className="font-semibold">New Shop Opening</p>
            <p className="font-semibold">Special Discounts Available</p>
            <p className="font-semibold">Customer Testimonials</p>
            <p className="font-semibold">Behind the Scenes</p>
          </div>
        </div>
        <div className="w-full text-center mt-8 sm:mt-15">
          <p className="font-semibold pb-2">
            &copy; 2025 Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;