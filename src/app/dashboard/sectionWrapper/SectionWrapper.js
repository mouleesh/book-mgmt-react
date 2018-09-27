import React from 'react';

const SectionWrapper = props => {
    const {sectionId, sectionHeading, children} = props;
    return (
        <section id={sectionId} className="dashboard-card">
            <h4 className="heading">{sectionHeading}</h4>
            {children}
        </section>
    );
}

export default SectionWrapper;