
function Footer() {
  return (
    <footer id="Contact" className="w-full mt-10 ">
      <div className="relative min-w-fit flex flex-col justify-between px-3 sm:px-10 pt-10 bg-orange-300">
        <svg class="absolute -top-2 left-0 w-full h-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L110,0C35,150 35,0 0,100z" fill="#ffffff"></path>
        </svg>
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
            &copy; {new Date().getFullYear()} Merkato Gebeya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;