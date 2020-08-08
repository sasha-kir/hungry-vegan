import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiCheck, FiX } from 'react-icons/fi';
import { FormInput } from 'components/common';

interface EditItemProps {
    item: UserListItem;
    toggleEdit(e): void;
    saveEdit(item: UserListItem): void;
}

const VenuesListItemEdit = ({ item, toggleEdit, saveEdit }: EditItemProps) => {
    const { setValue, getValues, control } = useForm();

    const handleSave = () => {
        const updatedValues = getValues();
        saveEdit({ ...item, ...updatedValues });
    };

    return (
        <>
            <div className="list-item is-active">
                {item.name}
                <div className="list-item-stop-edit">
                    <FiX className="cancel" onClick={toggleEdit} />
                    <FiCheck className="save" onClick={handleSave} />
                </div>
            </div>
            <div className="list-item-edit">
                <form>
                    <Controller
                        as={FormInput}
                        name="instagram"
                        label="instagram"
                        control={control}
                        defaultValue={item.instagram || ''}
                        setValue={setValue}
                    />
                    <Controller
                        as={FormInput}
                        isToggle={true}
                        name="onlyDelivery"
                        label="onlyDelivery"
                        type="checkbox"
                        control={control}
                        defaultValue={item.onlyDelivery}
                        setValue={setValue}
                    />
                    <Controller
                        as={FormInput}
                        isToggle={true}
                        name="onlyTakeaway"
                        label="onlyTakeaway"
                        type="checkbox"
                        control={control}
                        defaultValue={item.onlyTakeaway}
                        setValue={setValue}
                    />
                    <Controller
                        as={FormInput}
                        isToggle={true}
                        name="maybeClosed"
                        label="maybeClosed"
                        labelClassName="warning"
                        type="checkbox"
                        control={control}
                        defaultValue={item.maybeClosed}
                        setValue={setValue}
                    />
                </form>
            </div>
        </>
    );
};

export default VenuesListItemEdit;
