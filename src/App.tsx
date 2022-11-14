import React, {useState} from 'react';
import './App.css';
import ShowTweets from './ShowTweets';

function App() {
	const [tweets, setTweets] = useState([]);

	const fileChanged = (ev : React.FormEvent<HTMLInputElement>) => {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			const target = ev.target as HTMLInputElement;
			if (!target || !target.files) {
				return;
			}
			const file = target.files[0];
	
			const textFile = /text.*/;
	
			const reader = new FileReader();
			if (file.type.match(textFile)) {
				reader.onload = function (event) {
					if (event && event.target && event.target.result && typeof event.target.result === 'string') {
						const fileString = event.target.result;
						const arkiv = JSON.parse(fileString.slice(fileString.indexOf('[')));

						setTweets(arkiv);
					}		
				}
			}
			reader.readAsText(file);
		}
	}
	return (
		<div className="App">
			<h1>Dine beste tweets</h1>			
			{!tweets.length ? <label className="upload-box" htmlFor="fil">
				<ol>
					<li>Last ned Twitter-arkivet ditt fra Twitter.</li>
					<li>Pakk ut arkivet. Arkivet består av ei HTML-fil og to mapper. Tweetane dine ligger i fila <em>tweets.js</em>, som ligger i mappa <em>data</em>.</li>
					<li>Klikk kvar som helst i denne boksen, bla deg fram til <em>tweets.js</em>, og velg denne.</li>
					<li>Etter at du har gjort dette, vent litt, så dukker tweetane dine opp her og du vil kunne sortere/filtrere dei.</li>
				</ol>
				<input type="file" id="fil" multiple onChange={(ev) => fileChanged(ev)} />
			</label> : undefined}
			<ShowTweets tweets={tweets} />
			<p className="privacy"><strong>Personverngreier:</strong> Når du bruker dette scriptet, gjerast filtrering og sortering på di eiga datamaskin, i din eigen nettlesar. Ingenting blir sendt inn til serveren, ingenting blir lagra nokon stad. Med andre ord: Absolutt ingenting av det som står i tweets.js-fila di blir delt med meg (eller nokre andre). Denne sida inneholder ingen informasjonskapslar eller statistikkverktøy, så ingen informasjon om deg blir lagra nokon stad når du bruker den. Klikker du på linkene som dukker opp for å vise tweets, tar dei deg til Twitter, som sjølvsagt har sine eigne personvernretningslinjer som openbart er litt meir psycho enn mine, men det er ikkje mitt problem. Og sånn elles er dette laga av Olaf Moriarty Solstrand (<a href="https://twitter.com/olafmoriarty" target="_blank" rel="noreferrer">@olafmoriarty</a>), og du finner <a href="https://github.com/olafmoriarty/dinebestetweets" target="_blank" rel="noreferrer">koden på GitHub</a>.</p>
		</div>
	);
}

export default App;
