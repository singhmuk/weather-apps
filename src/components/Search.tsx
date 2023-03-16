import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/actions/alertAction'
import { getWeather, setLoading } from '../store/actions/weatherAction'
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      border:0,
      outline:0,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      padding:5,
    },
    searchBtn:{
      padding:5,
      border:0,
      outline:0,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
    }
  }));

interface SearchProps {
    title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [city, setCity] = useState('');

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        setCity(e.currentTarget.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(city.trim() === '') {
            return dispatch(setAlert('Please enter a city!'));
        }
        dispatch(setLoading());
        dispatch(getWeather(city));
        setCity('');
    }

    return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
          {title}
          </Typography>

          <div className={classes.search}>
            <form onSubmit={submitHandler}>
                <input
                type="text"
                placeholder="Enter city name"
                style={{maxWidth: 300}}
                value={city}
                onChange={changeHandler}
                className={classes.search}
                />
                <button className={classes.searchBtn}>Search</button>
            </form>
          </div>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default Search;