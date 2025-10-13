import { Carousel, Image } from "react-bootstrap";

const API_URL = "http://localhost:5043";

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="display-4">Welcome to My Shop</h1>
      <Carousel>
        <Carousel.Item>
          <Image src={`/images/pizza.jpg`} className="d-block w-100" alt="Pizza" />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={`/images/fishandchips.jpg`} className="d-block w-100" alt="Fish and Chips" />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={`images/tacos.jpg`} className="d-block w-100" alt="Tacos" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePage;
