import React, { FC } from "react";
import { WeatherData } from "../store/types";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
      maxWidth: "50%",
      margin:40,
      marginLeft:"25%"
    },
	celcious:{
		color:'black',
		fontWeight:'bold'
	},
	temp:{
		color:'blue'
	},
	skyfloat:{
		textAlign:'center',
		fontSize:"30px"
	}
  });

interface WeatherProps {
	data: WeatherData;
}

const Weather: FC<WeatherProps> = ({ data }) => {
	const classes = useStyles();
	const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
	const celsius = (data.main.temp - 273.15).toFixed(2);
	console.log(data.weather[0]);
	return (
		<Card className={classes.root}>
            <CardContent>
				<section>
					<div className='container'>
						<div className="has-background-danger">
						<p className={classes.skyfloat}>{data.name} - {data.sys.country}</p>
						<p >{data.weather[0].description}</p>
							</div>
							<hr/>
						<div>
							<p className={classes.temp}>temp</p>
							<div className={classes.celcious}>
								<p className={classes.celcious}>{celsius}K</p>
								<p className={classes.celcious}>
									{fahrenheit}
									<sup>&#8457;</sup>
								</p>
								<p>
									{celsius}
									<sup>&#8451;</sup>
								</p>
							</div>
						</div>
						<div>
							<p>humidity</p>
							<p>{data.main.humidity}</p>
						</div>
							<div>
								<p className={classes.celcious}>pressure</p>
								<p>{data.main.pressure}</p>
							</div>
							<div>
								<p className={classes.celcious}>wind</p>
								<p>{data.wind.speed} m/s</p>
							</div>
					</div>
				</section>
		</CardContent>
        </Card>
	);
};

export default Weather;
