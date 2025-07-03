import "./listPage.scss";
import Filter from "../../componants/filter/filter.jsx";
import Card from "../../componants/card/card.jsx";
import Map from "../../componants/map/map.jsx";
import LoadingList from "../../componants/loadinglist/loadinglist.jsx";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import LoadingMap from "../../componants/loadingmap/loadingmap.jsx";

function ListPage() {
    const data = useLoaderData();

    return (
        <div className="listpage">
            <div className="container">
                <div className="listcontainer">
                    <Filter />
                    <div className="wrapper">
                        <div className="list">
                            <Suspense fallback={<LoadingList />}>
                                <Await
                                    resolve={data.postResponse}
                                    errorElement={<p>Error loading posts!</p>}
                                >
                                    {(postResponse) =>
                                        postResponse.data.map((post) => (
                                            <Card
                                                item={post}
                                                key={post.id}
                                            ></Card>
                                        ))
                                    }
                                </Await>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className="mapcontainer">
                    <div className="mapWrapper">
                        <Suspense fallback={<LoadingMap />}>
                            <Await
                                resolve={data.postResponse}
                                errorElement={<p>Error loading posts!</p>}
                            >
                                {(postResponse) => (
                                    <Map
                                        items={postResponse.data}
                                        zoom={5}
                                        show={true}
                                    />
                                )}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListPage;
