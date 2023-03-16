import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
      maxWidth: "50%",
      margin:40,
      marginLeft:"25%"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

interface AlertProps {
    message: string;
    onClose: () => void;
}

const Alert: FC<AlertProps> = ({ message, onClose }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <header className="modal-card-head has-background-danger" style={{justifyContent: 'center'}}>
                    <p>{message}</p>
                </header>
                
                <Button size="small" onClick={onClose} color="primary">
                    Close
                </Button>
            </CardContent>
        </Card>
    )
}

export default Alert;