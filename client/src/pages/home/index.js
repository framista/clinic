import React from 'react';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './home.css';
import ImgMediaCard from '../../components/imgMediaCard';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Home = () => {
  return (
    <div className="homecontainer">
      <header className="home--header">
        <div className="header__description">
          <ThemeProvider theme={theme}>
            <Typography className="home__text" variant="h1">
              Virtual clinic
            </Typography>
            <Typography
              className="home__text"
              color="textSecondary"
              variant="h4"
            >
              Profesjonalny i niezawodny portal pacjenta
            </Typography>
          </ThemeProvider>
        </div>
        <div className="header__image">
          <img src="medicine.png"></img>
        </div>
      </header>
      <main className="home--main">
        <ImgMediaCard
          title="Badanie"
          description="Wypełnij wstępne badanie lekarskie, które pomoże rozpoznać chorobę wcześniej."
          image="form.png"
          url="/survey"
        />
        {/* <ImgMediaCard title="Recepta" description="Pobierz online receptę na stale przyjmowane leki bez wizyty u lekarza." image="drug.png" url="/prescription/list" /> */}
        <ImgMediaCard
          title="Wizyta"
          description="Umów wizytę na najlepszy dla Ciebie terminie bez konieczności czekania przy recepcji."
          image="calendar.png"
          url="/visit"
        />
      </main>
    </div>
  );
};

export default Home;
