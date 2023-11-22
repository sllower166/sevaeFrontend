import "./backImg.css";

export const BackImg = () => {
  return (
    <div className="disable">
      <div className="image-container-2 z-inherit">
        <img src="/assets/waves.png" alt="waves sevae"></img>
      </div>

      <div className="h2-container ">
        <p className="h1-corner">
          SEVAE
          <span>SAFETY EDUCATION INNOVATION</span>
        </p>
      </div>
      <div className="image-container">
        <img
          src="/assets/child_not_bg.png"
          alt="child sevae"
          id="child_image"
        ></img>
        <img src="/assets/book_image.png" alt="book"></img>
      </div>
    </div>
  );
};
