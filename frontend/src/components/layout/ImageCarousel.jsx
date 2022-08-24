const ImageCarousel = (props) => {
  return (
    <div id="imageCarousel" className="carousel carousel slide" data-bs-ride="carousel" >
      <div id="carouselImages" className="carousel-inner">
        {props.children}
      </div>
      <button id="carousel-prev-button" className="carousel-control-prev pe-5" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev" >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button id="carousel-next-button" className="carousel-control-next ps-5" type="button" data-bs-target="#imageCarousel" data-bs-slide="next" >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default ImageCarousel