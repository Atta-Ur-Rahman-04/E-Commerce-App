import { assets } from "../assets/assets";

export const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-1/2 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
            quod libero voluptate hic, possimus deserunt id fugit porro nostrum
            similique natus consequatur. Amet ab iusto blanditiis eligendi
            voluptas similique optio.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92329-1234567</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          CopyRight 2026 forever.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};
