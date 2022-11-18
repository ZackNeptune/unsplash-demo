import React, { useEffect, useState } from 'react'
import Image from "../components/Image"
import { useParams } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'

import { searchImages } from "../unsplash"

function SearchPage() {
    const [page,setpage]= useState(1) 
    const { searchTerm } = useParams()
    const [images, setImages] = useState([])
    const [totalpages, settotalpage] = useState(1)

    //useEffect(() => {
        const searchimg = (page) => {
        searchImages(searchTerm,page)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                settotalpage(data.total_pages)
                data.results.map(image => (setImages((olddata)=>
                    [...olddata,{
                        id: image.id,
                        imageUrl: image.urls.regular,
                        downloadUrl: image.urls.full,
                        username: image.user.username,
                        userImageUrl: image.user.profile_image.medium,
                        profileUrl: image.user.links.html
                    }]))
                )
            })
            .catch(error => alert(error))}
    //}, [searchTerm])
useEffect(()=>console.log({page,totalpages,hasMore:page<=totalpages}),[page,totalpages])
    return (
        <div className="wrapper">
            <div className="container">

                <h1 className="title">{searchTerm}</h1>

                <InfiniteScroll 
                        
                            dataLength={images.length} //This is important field to render the next data
                            next={()=>{setpage(page+1)
                                searchimg(page)
                            console.log({page,totalpages,hasMore:page<=totalpages})}}
                            hasMore={page<=totalpages}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                            // below props only if you need pull down functionality
                            refreshFunction={searchimg}
                            pullDownToRefresh
                            pullDownToRefreshThreshold={50}
                            pullDownToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                            }
                            releaseToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                            }
                        >
                         
                        <div className="images__container">{
                            images.map(image => (
                                <Image key={image.imageUrl} data={image} />
                            ))
                        } </div>  
                        </InfiniteScroll>
            </div>
        </div>
    )
}

export default SearchPage
