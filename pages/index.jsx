import React, { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import ResourceHighlight from '/components/ResourceHighlight';
import ResourceList from '/components/ResourceList';
import Footer from '/components/Footer';

// CORS

const Home = ({ resources }) => {
	return (
		<Layout>
			<ResourceHighlight resources={resources.slice(0, 2)} />
			<hr />
			<ResourceList resources={resources.slice(2)} />
			<Footer />
		</Layout>
	);
};

// This is called every time you will visit the page
// function is executed on the server.
// data is always fresh.
export async function getServerSideProps(ctx) {
	const resData = await fetch(`${process.env.API_URL}/resources`);
	const data = await resData.json();
	return {
		props: {
			resources: data,
		},
	};
}

export default Home;
