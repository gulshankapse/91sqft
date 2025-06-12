import "./homePage.scss";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import SearchBar from "../../componants/searchbar/searchbar";
import TopListings from "../../componants/toplistings/toplistings";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { FixedSizeList as List } from "react-window";

function HomePage() {
    const data = useLoaderData();

    let itemSize = 248;
    let listHeight = 340;

    if (window.innerWidth <= 480) {
        itemSize = 160;
        listHeight = 250;
    }

    useEffect(() => {
        ScrollReveal().reveal(".heading", {
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
    }, []);

    return (
        <div className="homePage">
            <div className="top">
                <div className="wrapper">
                    <div className="heading">
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
                <div className="head">
                    <span>Top Listings</span>
                    <div>
                        explore all
                        <a href="/list">
                            <img src="uploadB.png" alt="" />
                        </a>
                    </div>
                </div>
                <Suspense
                    fallback={
                        <p
                            style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                textAlign: "center",
                                padding: "20px",
                                color: "#444",
                            }}
                        >
                            Finding the best property for you...
                        </p>
                    }
                >
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >
                        {(postResponse) => (
                            <div className="listings">
                                <List
                                    //ref={listRef}
                                    height={listHeight}
                                    itemCount={4}
                                    itemSize={itemSize}
                                    width={1024}
                                    layout="horizontal"
                                    style={{ overflow: "hidden" }}
                                >
                                    {({ index, style }) => {
                                        const post = postResponse.data[index];
                                        return (
                                            <div
                                                style={{
                                                    ...style,
                                                    padding:
                                                        "20px 0px 20px 20px", // 14px total gap between cards
                                                }}
                                                key={post.id}
                                            >
                                                <TopListings post={post} />
                                            </div>
                                        );
                                    }}
                                </List>
                                <div className="all"></div>
                            </div>
                        )}
                    </Await>
                </Suspense>
            </div>
            <div className="btm">
                <div className="left"></div>
                <div className="right">
                    <span>About Us</span>
                    <h2>
                        India’s Trusted Property Discovery Platform
                        <br />
                        Buy, Sell & Explore with Confidence
                    </h2>
                    <p>
                        At 91sqft, we connect people with their dream properties
                        effortlessly. Our platform offers a curated selection of
                        homes, plots, and commercial spaces. With a focus on
                        trust and transparency, we simplify real estate for
                        everyone. Begin your journey to the perfect space where
                        comfort meets convenience.
                    </p>
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
