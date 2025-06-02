'use client';
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";
import MinuteCount from "../shared/MinuteCount";
import Tags from "../Tags/Tags";
import "../../css/blog.css";
import React from "react";

interface BlogsProps {
    route?: "base" | "derived";
    blogsData: any;
}

const truncateContent = (text: string, wordLimit: number) => {
    const words = text?.split(" ");
    return words?.length > wordLimit ? words?.slice(0, wordLimit).join(" ") + "..." : text;
};


export const BlogHero = ({ route = 'base', blogsData }: BlogsProps) => {
    const isMobile = useIsMobile();
    return (
        <>
            <div className="blog-hero-container">
                <div className="blog-heading">
                    <div className={`${route === 'base' ? 'blog-heading-title' : 'blog-heading-title-more'}`}>
                        {`${route === "base" ? "" : "More "}`}{" "}
                        <span className="jrny-span">Blogs</span>
                    </div>

                </div>
                {
                    (isMobile || route === 'derived') ? <BlogTileMobileContainer blogsData={blogsData} /> : <BlogTileContainer blogsData={blogsData} />

                }
            </div>
        </>
    )
}

export const BlogTileContainer = ({blogsData} : any) => {
    return (
        <>
            <div className="blog-tile-container">
                {blogsData?.map((BlogItem: any, index: number) => (
                    <React.Fragment key={index}>
                        <Link href={`/blog/${BlogItem.slug}`} className="blog-link" key={BlogItem.id}>
                            <BlogTile thumbnail={BlogItem.thumbnailUrl}
                                title={BlogItem.title}
                                content={BlogItem.shortDescription}
                                description={BlogItem.description}
                                categories={BlogItem.categories}
                            />
                        </Link>
                        {(index + 1 !== blogsData.length) &&
                            <img src='/blog-line.svg' />}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

interface BlogItemProps {
    thumbnail?: any;
    title: string;
    content: string;
    description: string;
    categories: any;
}

export const BlogTile = ({ thumbnail, title, content, description, categories }: BlogItemProps) => {
    return (
        <div className="blog-tile">
            <div className="blog-info">
                <div className="minute-count-in-tile"><MinuteCount textString={description} /></div>

                <div className="blog-tile-title-content-container">

                    <div className="blog-tile-heading">{title}</div>
                    <div className="blog-tile-description">{truncateContent(content, 30)}</div>
                </div>
                <div className="tag-container">
                    {
                        categories?.map((item: string, index: number) => (
                            <React.Fragment key={index}>
                            <Tags tagTitle={item} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
            <div className="blog-image">
                <img src={thumbnail} alt={title} />
            </div>
        </div>
    );
};

export const BlogTileMobile = ({ thumbnail, title, content, description, categories }: BlogItemProps) => {
    return (
        <div className="blog-tile-mobile">
            <div className="blog-image-mobile">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="blog-info-mobile">


                <div className="blog-tile-heading-mobile">{title}</div>

                <div className="tag-container">
                    {
                        categories?.map((item: string, index: number) => (
                            <React.Fragment key={index}>
                            <Tags tagTitle={item} />
                            </React.Fragment>
                        ))
                    }
                </div>

                <div className="minute-count-in-tile-m"><MinuteCount textString={description} /></div>
            </div>

        </div>
    );
};

export const BlogTileMobileContainer = ({blogsData}: any) => {
    return (
        <>
            <div className="blog-tile-container-mobile">
                {blogsData?.map((BlogItem: any, index: any) => (
                    <div key={index} className='blog-tile-mobile'>
                        <Link href={`/blog/${BlogItem.slug}`} className="blog-link" key={BlogItem.id}>
                            <BlogTileMobile
                                thumbnail={BlogItem.thumbnailUrl}
                                title={BlogItem.title}
                                content={BlogItem.shortDescription}
                                description={BlogItem.description}
                                categories={BlogItem.categories}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}