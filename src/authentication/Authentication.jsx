import React from 'react';
import useStyles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LinearProgress, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { authentication, selectLoading, selectError } from './authenticationSlice';

function Authentication() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const authenticationSchema = Yup.object().shape({
        login: Yup.string()
            .min(5, 'Minimum 5 characters')
            .max(128, 'Maximum 128 characters')
            .required('Login is required'),
    });

    const formik = useFormik({
        initialValues: {
            login: '',
        },
        validationSchema: authenticationSchema,
        onSubmit: values => {
            dispatch(authentication(values));
        },
    });


    return (
        <section className={classes.wrapperVerticalCentred}>
            <Card className={classes.root}>
                <CardActionArea  style={{ borderBottom: '1px solid silver' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align='center'>
                            Authentication
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" align='center'>
                            Create a new account to work with this application
                        </Typography>
                    </CardContent>
                </CardActionArea>
                { isLoading ? <LinearProgress/> : null }
                <form onSubmit={formik.handleSubmit} className={classes.inputColumn} noValidate>
                    <TextField
                        className={classes.input}
                        required
                        id="login"
                        label="Login"
                        name="login"
                        onChange={formik.handleChange}
                        value={formik.values.login}
                        error={!!(formik.touched.login && formik.errors.login)}
                        helperText={formik.touched.login && formik.errors.login}
                    />

                    {
                        error.message ?
                            <Typography variant="caption" color='error' align='center' display="block" gutterBottom>
                                {error.message}
                            </Typography>
                            :
                            null
                    }

                    <CardActions>
                        <Button type='submit'>
                            Login
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </section>
    );
}
export default Authentication;