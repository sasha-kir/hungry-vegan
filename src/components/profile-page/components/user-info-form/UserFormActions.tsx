import React, { ReactElement } from 'react';
import { FancyButton } from 'components/common';

interface ProfileActionsProps {
    isEditingMode: boolean;
    handleCancel(): void;
    handleSave(): void;
    handleStartEdit(): void;
}

const ProfileActions = (props: ProfileActionsProps): ReactElement => {
    if (props.isEditingMode) {
        return (
            <div className="user-info-actions user-info-editing-actions">
                <FancyButton
                    type="button"
                    onClick={props.handleCancel}
                    className="user-info-editing-btn cancel-btn"
                >
                    cancel
                </FancyButton>
                <FancyButton
                    type="button"
                    onClick={props.handleSave}
                    className="user-info-editing-btn"
                >
                    save
                </FancyButton>
            </div>
        );
    } else {
        return (
            <FancyButton
                type="button"
                onClick={props.handleStartEdit}
                className="user-info-actions"
            >
                edit
            </FancyButton>
        );
    }
};

export default ProfileActions;
