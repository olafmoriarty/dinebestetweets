import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';

function Tweet(props : Props) {
	const {tweet} = props;
  return (
	<div className="tweet">
		<div className="created-time">{tweet.created_at}</div>
		<div className="tweet-text">{tweet.full_text}</div>
		<div className="meta">
			<div className="favs"><FontAwesomeIcon icon={faHeart} /> {tweet.favorite_count}</div>
			<div className="retweets"><FontAwesomeIcon icon={faRetweet} /> {tweet.retweet_count}</div>
			<div><a href={`https://twitter.com/twitter/status/${tweet.id}`} target="_blank" rel="noreferrer">Vis på Twitter</a></div>
		</div>
	</div>
  )
}

interface Props {
	tweet : any,
}

export default Tweet