import React from 'react';

const Panel = props => {
    const {sectionID, sectionHeading, children} = props;
    return (
        <section id={sectionID} className="m-2 panel-card">
            <h4 className="heading">{sectionHeading}</h4>
            {children}
        </section>
    );
}

export default Panel;