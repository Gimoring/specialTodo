import Layout from 'components/Layout';
import Link from 'next/link';
import axios from 'axios';
import ResourceLabel from 'components/ResourceLabel';
import moment from 'moment';

const ResourceDetail = ({ resource }) => {
	const ActivateResource = () => {
		axios
			.patch('/api/resources', { ...resource, status: 'active' })
			.then(() => location.reload())
			.catch(() => alert('Cannot activate the resource!'));
	};

	return (
		<Layout>
			<section className='hero '>
				<div className='hero-body'>
					<div className='container'>
						<section className='section'>
							<div className='columns'>
								<div className='column is-8 is-offset-2'>
									<div className='content is-medium'>
										<h2 className='subtitle is-4'>
											{moment(resource.createdAt).format('LLL')}
											<ResourceLabel status={resource.status} />
										</h2>
										<h1 className='title'>{resource.title}</h1>
										<p>{resource.description}</p>
										<p>Time to Finish : {resource.timeToFinish} min</p>
										{resource.status === 'inactive' && (
											<>
												<Link href={`/resources/${resource.id}/edit`}>
													<a className='button is-warning'>수정</a>
												</Link>
												<button
													className='button is-success ml-2'
													onClick={ActivateResource}
												>
													활성
												</button>
											</>
										)}
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export async function getServerSideProps({ params }) {
	const dataRes = await fetch(`${process.env.API_URL}/resources/${params.id}`);
	const data = await dataRes.json();

	return {
		props: {
			resource: data,
		},
	};
}

export default ResourceDetail;
