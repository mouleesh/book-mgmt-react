import React from 'react';

const Panel = props => {
    const {sectionId, sectionHeading, children} = props;
    return (
        <section id={sectionId} className="m-2 dashboard-card">
            <h4 className="heading">{sectionHeading}</h4>
            {children}
        </section>
    );
}

export default Panel;