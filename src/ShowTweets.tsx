import React, {useState} from 'react'
import Tweet from './Tweet'

function ShowTweets(props : Props) {
	
	const [formValues, setFormValues] = useState({
		showRetweets: false,
		showReplies: false,
		sortBy: 'rt',
		minRetweets: 0,
		minFavs: 0,
		count: 100,
	} as any);

	const updateValue = (ev : any) => {
		const newFormValues = { ...formValues };
		newFormValues[ev.target.name] = ev.target.value;
		setFormValues(newFormValues);
	}

	const tweetsToShow = props
		.tweets
		.filter((el : any) => 
			(formValues.showRetweets || el.tweet.full_text.substring(0, 4) !== 'RT @')
			&& (formValues.showReplies || !el.tweet.in_reply_to_status_id)
			&& (parseInt(el.tweet.favorite_count) >= parseInt(formValues.minFavs))
			&& (parseInt(el.tweet.retweet_count) >= parseInt(formValues.minRetweets))
		)
		.sort((a : any, b : any) => {
			if (formValues.sortBy === 'rt') {
				return parseInt(b.tweet.retweet_count) - parseInt(a.tweet.retweet_count);
			}
			if (formValues.sortBy === 'fav') {
				return parseInt(b.tweet.favorite_count) - parseInt(a.tweet.favorite_count);
			}
			if (formValues.sortBy === 'desc') {
				return parseInt(b.tweet.id) - parseInt(a.tweet.id);
			}
			if (formValues.sortBy === 'asc') {
				return parseInt(a.tweet.id) - parseInt(b.tweet.id);
			}
			return 0;
		})
		.slice(0, formValues.count)

	return (
		<>
			<div className="dashboard">
				<div>
					<label>
						<p>Sorter etter</p>
						<select value={formValues.sortBy} name="sortBy" onChange={ev => updateValue(ev)}>
							<option value="rt">Retweets</option>
							<option value="fav">Likes</option>
							<option value="asc">Eldste først</option>
							<option value="desc">Nyaste først</option>
						</select>
					</label>
				</div>
				<div>
					<label>
					<p>Minimum antall retweets</p>
					<input type="number" name="minRetweets" value={formValues.minRetweets} onChange={ev => updateValue(ev)} />
					</label>
				</div>
				<div>
					<label>
						<p>Minimum antall likes</p>
						<input type="number" name="minFavs" value={formValues.minFavs} onChange={ev => updateValue(ev)} />
					</label>
				</div>
				<div>
					<label>
						<p>Maks antall tweets å vise</p>
						<input type="number" name="count" value={formValues.count} onChange={ev => updateValue(ev)} />
					</label>
				</div>
				<div>
					<label>
						<p><input type="checkbox" name="showRetweets" onChange={ev => updateValue(ev)} /> Vis retweets</p>
					</label>
				</div>
				<div>
					<label>
						<p><input type="checkbox" name="showReplies" onChange={ev => updateValue(ev)} /> Vis svar</p>
					</label>
				</div>
			</div>
			<div>{
				tweetsToShow.map((el : any) => <Tweet tweet={el.tweet} key={el.tweet.id} />)
			}</div>
		</>
  )
}

interface Props {
	tweets: any,
}

export default ShowTweets