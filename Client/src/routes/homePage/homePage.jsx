import "./homePage.scss";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import SearchBar from "../../componants/searchbar/searchbar";
import TopListings from "../../componants/toplistings/toplistings";

function HomePage() {
    useEffect(() => {
        ScrollReveal().reveal(".head", {
            origin: "left",
            distance: "60px",
            duration: 1000,
            delay: 200,
            easing: "ease-in-out",
            reset: false,
        });

        ScrollReveal().reveal(".tagline", {
            origin: "bottom",
            distance: "30px",
            duration: 800,
            delay: 300,
        });

        ScrollReveal().reveal(".searchbar", {
            origin: "top",
            distance: "40px",
            duration: 1000,
            delay: 500,
        });

        // ScrollReveal().reveal(".boxes .box", {
        //     interval: 200,
        //     origin: "bottom",
        //     distance: "40px",
        //     duration: 1000,
        //     delay: 600,
        // });
    }, []);

    return (
        <div className="homePage">
            <div className="top">
                <div className="wrapper">
                    <div className="head">
                        <h1 className="tagline">
                            Discover your <br />
                            dream space <br />
                            with 91sqft.
                        </h1>
                        <p>
                            Welcome to 91sqft, where your dream <br />
                            property awaits. Explore our listings <br />
                            and step closer to finding your perfect <br />
                            home today!
                        </p>
                    </div>
                    <div className="searchbar">
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div className="mid">
                <div className="heading">
                    <span>Our Popular</span>
                    <a href="/list">explore all</a>
                </div>
                <div className="listings">
                    <TopListings /> <TopListings /> <TopListings />
                    <TopListings />
                </div>
            </div>
            <div className="btm">
                <div className="left"></div>
                <div className="right">
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>1200+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

/* <div className="boxes">
                <div className="box">
                  <h1>16+</h1>
                  <h2>Years of Experience</h2>
                </div>
                <div className="box">
                  <h1>200</h1>
                  <h2>Award Gained</h2>
                </div>
                <div className="box">
                  <h1>1200+</h1>
                  <h2>Property Ready</h2>
                </div>
              </div> */
