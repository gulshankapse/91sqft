import "./slider.scss";
import { useState } from "react";

function Slider({ images }) {
    const [imageIndex, setImageIndex] = useState(null);
    let n = images.length;

    return (
        <div className="imageCard">
            <div className="slider">
                {imageIndex != null && (
                    <div className="fullslider">
                        <div className="arrow">
                            <img
                                src="/arrow.png"
                                alt=""
                                onClick={() =>
                                    setImageIndex((imageIndex + (n - 1)) % n)
                                }
                            />
                        </div>
                        <div className="imageContainer">
                            <img src={images[imageIndex]} alt="" />
                        </div>
                        <div className="arrow">
                            <img
                                src="/arrow.png"
                                alt=""
                                className="right"
                                onClick={() =>
                                    setImageIndex((imageIndex + 1) % n)
                                }
                            />
                        </div>
                        <div
                            className="close"
                            onClick={() => setImageIndex(null)}
                        >
                            X
                        </div>
                    </div>
                )}
                <div className="bigImage">
                    <img
                        src={images[0]}
                        alt=""
                        onClick={() => setImageIndex(0)}
                    />
                </div>
                <div className="smallImage">
                    {images.slice(1, 4).map((image, index) => (
                        <img
                            src={image}
                            alt=""
                            key={index}
                            onClick={() => setImageIndex(index + 1)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;
// import "./slider.scss";
// import { useState } from "react";

// function Slider({images}) {
//    const [imageIndex , setImageIndex] = useState(null);
//    let n = images.length;

//     return (
//       <div className="slider">
//         { imageIndex != null && ( <div className="fullslider">
//             <div className="arrow">
//                <img src="/arrow.png" alt="" onClick={()=>setImageIndex((imageIndex + (n-1)) % n)}/>
//             </div>
//             <div className="imageContainer">
//                <img src={images[imageIndex]} alt="" />
//             </div>
//             <div className="arrow">
//                <img src="/arrow.png" alt=""className="right" onClick={()=>setImageIndex((imageIndex+1) % n)}/>
//             </div>
//             <div className="close" onClick={()=>setImageIndex(null)}>X</div>
//         </div>
//         )}
//         <div className="imgcontainer">
//             <div className="bigImage">
//               <div className="span">helllo</div>
//               <img src={images[0]} alt="" onClick={()=>setImageIndex(0)}/>
//             </div>
//             <div className="smallImage">
//                {images.slice(1).map((image,index)=>(
//                   <img src={image} alt="" key={index} onClick={()=>setImageIndex(index+1)}/>
//                ))}
//             </div>
//         </div>
//       </div>
//     );
// }

// export default Slider;
