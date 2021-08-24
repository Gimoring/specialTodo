import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ActiveResource = () => {
	const [resource, setResource] = useState({});
	const [seconds, setSeconds] = useState();

	useEffect(() => {
		const fetchResource = async () => {
			const axiosRes = await axios.get('/api/activeresource');
			const resource = axiosRes.data;
			const timeToFinish = parseInt(resource.timeToFinish, 10);
			const elapsedTime = moment().diff(
				moment(resource.activationTime),
				'seconds'
			);

			const updatedTimeToFinish = timeToFinish * 60 - elapsedTime;
			if (updatedTimeToFinish >= 0) {
				resource.timeToFinish = updatedTimeToFinish;
				setSeconds(updatedTimeToFinish);
			}
			setResource(resource);
		};

		fetchResource();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
		}, 1000);

		if (seconds < 0) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [seconds]);

	const completeResource = () => {
		axios
			.patch('/api/resources', { ...resource, status: 'complete' })
			.then(() => location.reload())
			.catch(() => alert('Cannot complete the resource!'));
	};

	const hasResource = resource && resource.id;
	return (
		<div className='active-resource'>
			<h1 className='resource-name'>
				{resource ? resource.title : '현재 활성화된 리소스가 없습니다.'}
			</h1>
			<div className='time-wrapper'>
				{resource &&
					(seconds > 0 ? (
						<h2 className='elapsed-time'>{seconds}</h2>
					) : (
						<h2 className='elapsed-time'>
							<button className='button is-success' onClick={completeResource}>
								완료!
							</button>
						</h2>
					))}
			</div>
			{resource ? (
				<Link href={`/resources/${resource.id}`}>
					<a className='button'>활성화된 리소스로 이동</a>
				</Link>
			) : (
				<Link href='/'>
					<a className='button'>메인페이지</a>
				</Link>
			)}
		</div>
	);
};

export default ActiveResource;
