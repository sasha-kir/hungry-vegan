import React, { ReactElement } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { CardWrapper, FancyButton } from 'components/common';
import { useAuth } from 'context/auth';
import { cityGuideLink } from 'utils/links';
import './style.css';

const PublicHomePage = (): ReactElement => {
    const { authToken } = useAuth();

    if (authToken !== null) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="page-wrapper home-page-wrapper">
            <div className="home-page-content">
                <CardWrapper className="public-home-wrapper">
                    <div className="heading">Hungry Vegan</div>
                    <div className="content">
                        <p>
                            This app is a wrapper around {cityGuideLink()} lists with simpler
                            interface and ability to add tags and instagram handles.
                        </p>
                        <p>
                            By creating an account you can import your Foursquare lists and view /
                            update them here.
                        </p>
                        <p>
                            Here are some lists of places with vegan food I have been to or read
                            great reviews about.
                        </p>
                    </div>
                    <FancyButton styleType="small">
                        <Link to="/lists">view lists</Link>
                    </FancyButton>
                </CardWrapper>
            </div>
        </div>
    );
};

export default PublicHomePage;
