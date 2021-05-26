import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

export const MyChip = styled(Chip)`
    padding:2rem !important;
    font-size:1.5rem !important;
    font-family: Bnazanin !important;
    @media only screen and (max-width: 375px) {
        padding:0; 
    }
`;