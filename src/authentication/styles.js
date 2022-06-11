import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        margin: '0 auto 30vh auto',
        maxWidth: 500,
    },
    wrapperVerticalCentred: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: theme.spacing(1),
    }
}));

export default useStyles;