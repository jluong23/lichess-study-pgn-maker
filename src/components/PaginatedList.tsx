import React, { useState, useEffect } from "react";

interface Props {
    items: any[]
    itemsPerPage: number
    renderMethod: (input: any) => JSX.Element; //the render method for each item in items
}


const PaginatedList = ({ items, itemsPerPage, renderMethod }: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const pageItems = items.slice(currentPage*itemsPerPage, currentPage*itemsPerPage+itemsPerPage);

    // calculate number of pages needed
    const newMaxPages = Math.ceil(items.length / itemsPerPage);
    if(newMaxPages != maxPages){
        // if the max pages have changed, 
        // reset to first page
        setMaxPages(newMaxPages);
        setCurrentPage(0);
    }   
    
    const onNextPageClicked = () => {
        if(currentPage < maxPages-1){
            setCurrentPage(currentPage+1);
        }
    }

    const onBackPageClicked = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage-1);
        }
    }

    return (
        <div className="pagination-list">
            <div id="pagination-controls" className="space-x-2">
                <button className="pill-button bg-red-400" onClick={onBackPageClicked}>Back</button>
                <span>Page {currentPage+1}/{maxPages}</span>
                <button className="pill-button bg-blue-400" onClick={onNextPageClicked}>Next</button>
            </div>
            <div className="pagination-items">
                {pageItems.map((item) => renderMethod(item))}
            </div>
        </div>
    );
}

export default PaginatedList;