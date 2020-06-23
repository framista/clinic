import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 245,
        margin: '10px',
    },
});

export default function ImgMediaCard(props) {
    const classes = useStyles();
    const { title, description, image, url } = props;
    return (
        <Card className={classes.root}
            onClick={() => window.location.replace(url)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Image"
                    height="260"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}