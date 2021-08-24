import { useState } from 'react';

const ResourceForm = ({ onFormSubmit, initData }) => {
	const DEFAULT_DATA = {
		title: '',
		description: '',
		link: '',
		priority: '1',
		timeToFinish: 0,
	};

	const [form, setForm] = useState(initData || DEFAULT_DATA);

	const resetForm = () => setForm(DEFAULT_DATA);

	const submitForm = () => onFormSubmit(form);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	return (
		<div className='resource-form'>
			<h1 className='title'>Add New Resource</h1>
			<form>
				<div className='field'>
					<label className='label'>Title</label>
					<div className='control'>
						<input
							name='title'
							value={form.title}
							onChange={handleChange}
							className='input'
							type='text'
							placeholder='Learn Next JS and Sanity IO'
						/>
					</div>
				</div>

				<div className='field'>
					<label className='label'>Description</label>
					<div className='control'>
						<textarea
							name='description'
							value={form.description}
							onChange={handleChange}
							className='textarea'
							placeholder='Learn these technologies because they are very popular and enable better SEO'
						></textarea>
					</div>
				</div>
				<div className='field'>
					<label className='label'>Link</label>
					<div className='control'>
						<input
							name='link'
							value={form.link}
							className='input'
							onChange={handleChange}
							type='text'
							placeholder='https://www.naver.com'
						/>
					</div>
				</div>
				<div className='field'>
					<label className='label'>Priority</label>
					<div className='control'>
						<div className='select'>
							<select
								name='priority'
								value={form.priority}
								onChange={handleChange}
							>
								<option>1</option>
								<option>2</option>
								<option>3</option>
							</select>
						</div>
					</div>
				</div>
				<div className='field'>
					<label className='label'>Time to finish</label>
					<div className='control'>
						<input
							name='timeToFinish'
							value={form.timeToFinish}
							onChange={handleChange}
							className='input'
							type='number'
							placeholder='60'
						/>
					</div>
					<p className='help'>Time is in minutes</p>
				</div>
				<div className='field is-grouped'>
					<div className='control'>
						<button
							type='button'
							className='button is-link'
							onClick={submitForm}
						>
							Submit
						</button>
					</div>
					<div className='control'>
						<button
							type='button'
							className='button is-link is-light'
							onClick={resetForm}
						>
							Reset
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResourceForm;
