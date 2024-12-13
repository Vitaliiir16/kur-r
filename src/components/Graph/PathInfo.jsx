import React from 'react';

const PathInfo = ({ pathResult }) => {
    return (
        <div className="path-info">
            <h3>Найкоротший шлях:</h3>
            <div>Шлях: {pathResult.path.join(" -> ")}</div>
            <div>Довжина шляху: {pathResult.totalWeight}</div>
        </div>
    );
};

export default PathInfo;
