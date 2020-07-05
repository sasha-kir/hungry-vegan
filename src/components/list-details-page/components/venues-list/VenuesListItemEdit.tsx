import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormInput } from 'components/common';

interface EditItemProps {
    item: UserListItem;
}

const VenuesListItemEdit = ({ item }: EditItemProps) => {
    const { setValue, control } = useForm();

    return (
        <div className="list-item-edit">
            <form>
                <Controller
                    as={FormInput}
                    name="instagram"
                    control={control}
                    defaultValue={item.instagram || ''}
                    setValue={setValue}
                />
                <Controller
                    as={FormInput}
                    name="only delivery"
                    type="checkbox"
                    control={control}
                    defaultValue={item.onlyDelivery}
                    setValue={setValue}
                />
                <Controller
                    as={FormInput}
                    name="only takeaway"
                    type="checkbox"
                    control={control}
                    defaultValue={item.onlyTakeaway}
                    setValue={setValue}
                />
                <Controller
                    as={FormInput}
                    name="maybe closed"
                    type="checkbox"
                    control={control}
                    defaultValue={item.maybeClosed}
                    setValue={setValue}
                />
            </form>
        </div>
    );
};

export default VenuesListItemEdit;
