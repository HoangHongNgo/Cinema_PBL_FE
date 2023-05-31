import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {

    const { status } = useParams();

    return (
        <>
            <PageHeader>
                {status === "1" ? 'Phim đang chiếu' : 'Phim sắp chiếu'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid status={status}/>
                </div>
            </div>
        </>
    );
}

export default Catalog;