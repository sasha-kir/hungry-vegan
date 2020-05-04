import React, { ReactElement } from 'react';
import { css } from '@emotion/core';
import { BeatLoader as Loader } from 'react-spinners';

interface BeatLoaderProps {
    flag: boolean;
}

const override = css`
    margin: auto;
`;

const BeatLoader = ({ flag }: BeatLoaderProps): ReactElement => {
    return <Loader css={override} size={40} margin={5} color={'#19a186'} loading={flag} />;
};

export default BeatLoader;
