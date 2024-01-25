import Logo from "@/assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16 mt-2">
        <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
            <div className="mt-16 basis-1/2 md:mt-0">
                <img alt="logo" src={Logo} width={"50px"}/>
                <p className="my-5">We will fix your computer.</p>
                <p>© 2024 Computers All Rights Reserved.</p>
            </div>
            <div className="mt-16 basis-1/4 md:mt-0">
                <h4 className="font-bold">Links</h4>
                <p className="my-5"><a className="transition duration-500 hover:text-primary-300" href="https://www.instagram.com/ostapula/" target="_blank">Instagram</a></p>
                <p className="my-5"><a className="transition duration-500 hover:text-primary-300" href="https://twitter.com/ostapula" target="_blank">X</a></p>
                <p><a className="transition duration-500 hover:text-primary-300" href="https://discord.gg/TXYc2QtM" target="_blank">Discord</a></p>
            </div>
            <div className="mt-16 basis-1/4 md:mt-0">
                <h4 className="font-bold">Contact Us</h4>
                <p className="my-5">ostapnote3@gmail.com</p>
                <p>+48 111 111 111</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer