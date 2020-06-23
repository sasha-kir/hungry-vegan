import React, { ReactElement, memo } from 'react';
import { UserData } from 'api/user';

interface ProfileHeaderProps {
    user: UserData;
}

const UserInfoHeader = ({ user }: ProfileHeaderProps): ReactElement => {
    return (
        <div className="user-info-header">
            <div className="username">{user.username}</div>
            <div className="foursquare-status">
                {user.foursquareId !== '' ? (
                    <p>
                        <i className="fi-check"></i> Authorized on Foursquare
                    </p>
                ) : (
                    <p>No Foursquare account connected</p>
                )}
            </div>
        </div>
    );
};

export default memo(UserInfoHeader);
